import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider }    from 'firebase/auth';
import { getFirestore }                   from 'firebase/firestore';
import { getStorage }                     from 'firebase/storage';

// ─── Firebase Configuration (hardcoded) ───────────────────────────────────────
const firebaseConfig = {
  apiKey:            'AIzaSyDJhIaibuRhFXKLXlRThYldlxJ5HqqpwuY',
  authDomain:        'portfolio-63020.firebaseapp.com',
  projectId:         'portfolio-63020',
  storageBucket:     'portfolio-63020.firebasestorage.app',
  messagingSenderId: '553096565468',
  appId:             '1:553096565468:web:9e9c4c8fd32ea66d9c1a19',
  measurementId:     'G-HXLNPD7GWW',
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
