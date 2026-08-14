import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import type { FirebaseError } from 'firebase/app';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';
import type { User, AuthState } from '../types';

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Map a Firebase Auth error code to a friendly message. */
function friendlyError(err: unknown): string {
  const code = (err as FirebaseError)?.code ?? '';
  const map: Record<string, string> = {
    'auth/email-already-in-use':    'An account with this email already exists.',
    'auth/invalid-email':           'The email address is not valid.',
    'auth/weak-password':           'Password should be at least 6 characters.',
    'auth/user-not-found':          'No account found with this email.',
    'auth/wrong-password':          'Incorrect password. Please try again.',
    'auth/invalid-credential':      'Incorrect email or password.',
    'auth/too-many-requests':       'Too many attempts. Please wait a moment and try again.',
    'auth/popup-closed-by-user':    'Sign-in popup was closed before completing.',
    'auth/account-exists-with-different-credential':
      'An account already exists with the same email under a different sign-in method.',
  };
  return map[code] ?? 'An unexpected error occurred. Please try again.';
}

/** Derive a stable username from a display name (e.g. "Alex Johnson" → "alexjohnson"). */
function usernameFromName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 30) || 'user';
}

/** Read the /users/{uid} document and map it to our User shape. */
async function fetchAppUser(uid: string): Promise<User | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  const d = snap.data();
  return {
    uid,
    email:     d.email     ?? '',
    fullName:  d.fullName  ?? '',
    username:  d.username  ?? '',
    avatarUrl: d.avatarUrl ?? undefined,
    createdAt: d.createdAt ?? new Date().toISOString(),
    updatedAt: d.updatedAt ?? new Date().toISOString(),
  };
}

// ─── context shape ────────────────────────────────────────────────────────────

interface AuthContextValue extends AuthState {
  login:              (email: string, password: string) => Promise<void>;
  loginWithGoogle:    () => Promise<void>;
  register:           (fullName: string, email: string, password: string) => Promise<void>;
  registerWithGoogle: () => Promise<void>;
  logout:             () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user,      setUser]      = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // true until first auth check resolves

  // ── listen to Firebase auth state ──────────────────────────────────────────
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const appUser = await fetchAppUser(firebaseUser.uid);
        // If the Firestore doc doesn't exist yet (race condition on first sign-up)
        // fall back to info from the Firebase Auth object itself.
        setUser(appUser ?? {
          uid:       firebaseUser.uid,
          email:     firebaseUser.email ?? '',
          fullName:  firebaseUser.displayName ?? '',
          username:  usernameFromName(firebaseUser.displayName ?? ''),
          avatarUrl: firebaseUser.photoURL ?? undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return unsub;
  }, []);

  // ── email / password login ──────────────────────────────────────────────────
  const login = useCallback(async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will update the user state
    } catch (err) {
      throw new Error(friendlyError(err));
    }
  }, []);

  // ── Google popup login ──────────────────────────────────────────────────────
  const loginWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      // Create Firestore doc if this is their first Google sign-in
      const snap = await getDoc(doc(db, 'users', fbUser.uid));
      if (!snap.exists()) {
        const now = new Date().toISOString();
        const username = usernameFromName(fbUser.displayName ?? '');
        await setDoc(doc(db, 'users', fbUser.uid), {
          uid:         fbUser.uid,
          email:       fbUser.email ?? '',
          fullName:    fbUser.displayName ?? '',
          username,
          displayName: fbUser.displayName ?? '',
          bio:         '',
          avatarUrl:   fbUser.photoURL ?? '',
          location:    '',
          website:     '',
          skills:      [],
          socialLinks: [],
          isPublic:    true,
          createdAt:   now,
          updatedAt:   now,
          _createdAt:  serverTimestamp(),
        });
      }
    } catch (err) {
      throw new Error(friendlyError(err));
    }
  }, []);

  // ── email / password register ───────────────────────────────────────────────
  const register = useCallback(async (
    fullName: string,
    email:    string,
    password: string,
  ) => {
    try {
      const { user: fbUser } = await createUserWithEmailAndPassword(auth, email, password);

      // Set the display name on the Auth profile
      await updateProfile(fbUser, { displayName: fullName });

      // Create the Firestore user document
      const now      = new Date().toISOString();
      const username = usernameFromName(fullName);
      await setDoc(doc(db, 'users', fbUser.uid), {
        uid:         fbUser.uid,
        email,
        fullName,
        username,
        displayName: fullName,
        bio:         '',
        avatarUrl:   '',
        location:    '',
        website:     '',
        skills:      [],
        socialLinks: [],
        isPublic:    true,
        createdAt:   now,
        updatedAt:   now,
        _createdAt:  serverTimestamp(),
      });
      // onAuthStateChanged fires after this and sets state
    } catch (err) {
      throw new Error(friendlyError(err));
    }
  }, []);

  // ── Google register (same popup flow as login — Firebase merges) ────────────
  const registerWithGoogle = loginWithGoogle;

  // ── logout ──────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    await signOut(auth);
    // onAuthStateChanged sets user → null
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
        register,
        registerWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
