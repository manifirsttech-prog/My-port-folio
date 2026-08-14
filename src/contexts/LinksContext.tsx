import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';
import type { DevLink, LinkFormData } from '../types';

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Convert a Firestore Timestamp or ISO string to an ISO string. */
function toISO(v: unknown): string {
  if (v instanceof Timestamp) return v.toDate().toISOString();
  if (typeof v === 'string')  return v;
  return new Date().toISOString();
}

/** Map a raw Firestore document to our DevLink shape. */
function docToLink(id: string, data: Record<string, unknown>): DevLink {
  return {
    id,
    userId:      (data.userId      as string)  ?? '',
    title:       (data.title       as string)  ?? '',
    url:         (data.url         as string)  ?? '',
    description: (data.description as string)  ?? '',
    category:    (data.category    as DevLink['category']) ?? 'other',
    icon:        (data.icon        as string | undefined),
    pinned:      (data.pinned      as boolean) ?? false,
    clicks:      (data.clicks      as number)  ?? 0,
    createdAt:   toISO(data.createdAt),
    updatedAt:   toISO(data.updatedAt),
  };
}

// ─── context shape ────────────────────────────────────────────────────────────

interface LinksContextValue {
  links:        DevLink[];
  isLoading:    boolean;
  addLink:      (data: LinkFormData) => Promise<void>;
  updateLink:   (id: string, data: LinkFormData) => Promise<void>;
  deleteLink:   (id: string) => Promise<void>;
}

const LinksContext = createContext<LinksContextValue | null>(null);

// ─── provider ─────────────────────────────────────────────────────────────────

export function LinksProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [links,     setLinks]     = useState<DevLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ── real-time listener on /users/{uid}/links ────────────────────────────────
  useEffect(() => {
    if (!user) {
      setLinks([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const linksRef = collection(db, 'users', user.uid, 'links');
    const q        = query(linksRef, orderBy('_createdAt', 'desc'));

    const unsub = onSnapshot(q, (snap) => {
      const fetched = snap.docs.map(d =>
        docToLink(d.id, d.data() as Record<string, unknown>)
      );
      setLinks(fetched);
      setIsLoading(false);
    }, () => {
      // On permission errors (e.g. user just logged out) clear gracefully
      setLinks([]);
      setIsLoading(false);
    });

    return unsub;
  }, [user]);

  // ── add ─────────────────────────────────────────────────────────────────────
  const addLink = useCallback(async (data: LinkFormData) => {
    if (!user) throw new Error('Not authenticated');
    const now = new Date().toISOString();
    await addDoc(collection(db, 'users', user.uid, 'links'), {
      userId:      user.uid,
      title:       data.title,
      url:         data.url,
      description: data.description ?? '',
      category:    data.category,
      pinned:      data.pinned ?? false,
      clicks:      0,
      createdAt:   now,
      updatedAt:   now,
      _createdAt:  serverTimestamp(), // used for ordering
    });
  }, [user]);

  // ── update ───────────────────────────────────────────────────────────────────
  const updateLink = useCallback(async (id: string, data: LinkFormData) => {
    if (!user) throw new Error('Not authenticated');
    const ref = doc(db, 'users', user.uid, 'links', id);
    await updateDoc(ref, {
      title:       data.title,
      url:         data.url,
      description: data.description ?? '',
      category:    data.category,
      pinned:      data.pinned ?? false,
      updatedAt:   new Date().toISOString(),
    });
  }, [user]);

  // ── delete ───────────────────────────────────────────────────────────────────
  const deleteLink = useCallback(async (id: string) => {
    if (!user) throw new Error('Not authenticated');
    await deleteDoc(doc(db, 'users', user.uid, 'links', id));
  }, [user]);

  return (
    <LinksContext.Provider value={{ links, isLoading, addLink, updateLink, deleteLink }}>
      {children}
    </LinksContext.Provider>
  );
}

// ─── hook ─────────────────────────────────────────────────────────────────────

export function useLinks(): LinksContextValue {
  const ctx = useContext(LinksContext);
  if (!ctx) throw new Error('useLinks must be used inside <LinksProvider>');
  return ctx;
}
