import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider }    from 'firebase/auth';
import { getFirestore }                   from 'firebase/firestore';
import { getStorage }                     from 'firebase/storage';

// ─── Config (injected at build time by Vite from .env) ────────────────────────
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY             as string,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN         as string,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID          as string,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET      as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID              as string,
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID      as string,
};

// Prevent duplicate app init during Vite HMR
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth     = getAuth(app);
export const db       = getFirestore(app);
export const storage  = getStorage(app);

// Pre-configured Google provider (request profile + email scopes)
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

export default app;
