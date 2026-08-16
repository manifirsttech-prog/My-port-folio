import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  doc,
  onSnapshot,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { updateProfile as updateFirebaseAuthProfile } from 'firebase/auth';
import { db, auth } from '../lib/firebase';
import { uploadAvatar as uploadAvatarToCloudinary } from '../lib/cloudinary';
import { useAuth } from './AuthContext';
import type { UserProfile } from '../types';
import type { ProfileSchema } from '../lib/validations';

// ─── helpers ──────────────────────────────────────────────────────────────────

function toISO(v: unknown): string {
  if (v instanceof Timestamp) return v.toDate().toISOString();
  if (typeof v === 'string')  return v;
  return new Date().toISOString();
}

function docToProfile(uid: string, data: Record<string, unknown>): UserProfile {
  return {
    uid,
    email:       (data.email       as string)  ?? '',
    fullName:    (data.fullName     as string)  ?? '',
    username:    (data.username     as string)  ?? '',
    displayName: (data.displayName  as string)  ?? '',
    bio:         (data.bio          as string)  ?? '',
    avatarUrl:   (data.avatarUrl    as string)  ?? '',
    location:    (data.location     as string)  ?? '',
    website:     (data.website      as string)  ?? '',
    skills:      (data.skills       as string[]) ?? [],
    socialLinks: (data.socialLinks  as UserProfile['socialLinks']) ?? [],
    isPublic:    (data.isPublic     as boolean) ?? true,
    createdAt:   toISO(data.createdAt),
    updatedAt:   toISO(data.updatedAt),
  };
}

// ─── context shape ────────────────────────────────────────────────────────────

interface ProfileContextValue {
  profile:       UserProfile | null;
  isLoading:     boolean;
  saveProfile:   (data: ProfileSchema, skills: string[]) => Promise<void>;
  uploadAvatar:  (file: File) => Promise<string>;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

// ─── provider ─────────────────────────────────────────────────────────────────

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [profile,   setProfile]   = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ── real-time listener on /users/{uid} ──────────────────────────────────────
  useEffect(() => {
    if (!user) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const unsub = onSnapshot(
      doc(db, 'users', user.uid),
      (snap) => {
        if (snap.exists()) {
          setProfile(docToProfile(user.uid, snap.data() as Record<string, unknown>));
        } else {
          setProfile(null);
        }
        setIsLoading(false);
      },
      () => {
        setProfile(null);
        setIsLoading(false);
      }
    );

    return unsub;
  }, [user]);

  // ── save profile fields to Firestore ────────────────────────────────────────
  const saveProfile = useCallback(async (
    data:   ProfileSchema,
    skills: string[],
  ) => {
    if (!user) throw new Error('Not authenticated');
    const now = new Date().toISOString();
    await updateDoc(doc(db, 'users', user.uid), {
      displayName: data.displayName,
      username:    data.username.toLowerCase().trim(), // Always lowercase
      bio:         data.bio     ?? '',
      location:    data.location ?? '',
      website:     data.website  ?? '',
      skills,
      updatedAt:   now,
    });
    // Keep Firebase Auth displayName in sync
    if (auth.currentUser) {
      await updateFirebaseAuthProfile(auth.currentUser, {
        displayName: data.displayName,
      });
    }
  }, [user]);

  // ── upload avatar to Cloudinary, then save URL to Firestore ─────────────────
  const uploadAvatar = useCallback(async (file: File): Promise<string> => {
    if (!user) throw new Error('Not authenticated');
    
    // 1. Upload to Cloudinary (optimized and resized)
    const url = await uploadAvatarToCloudinary(file, user.uid);
    
    // 2. Save Cloudinary URL to Firestore
    await updateDoc(doc(db, 'users', user.uid), {
      avatarUrl: url,
      updatedAt: new Date().toISOString(),
    });
    
    // 3. Update Firebase Auth profile photo
    if (auth.currentUser) {
      await updateFirebaseAuthProfile(auth.currentUser, { photoURL: url });
    }
    
    return url;
  }, [user]);

  return (
    <ProfileContext.Provider value={{ profile, isLoading, saveProfile, uploadAvatar }}>
      {children}
    </ProfileContext.Provider>
  );
}

// ─── hook ─────────────────────────────────────────────────────────────────────

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used inside <ProfileProvider>');
  return ctx;
}
