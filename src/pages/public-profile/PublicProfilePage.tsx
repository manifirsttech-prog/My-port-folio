import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Globe, ExternalLink } from 'lucide-react';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/loaders/Spinner';
import { ErrorState } from '../../components/feedback/ErrorState';
import { displayUrl } from '../../utils';
import type { UserProfile, DevLink } from '../../types';

export function PublicProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [profile,   setProfile]   = useState<UserProfile | null>(null);
  const [links,     setLinks]     = useState<DevLink[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [notFound,  setNotFound]  = useState(false);

  useEffect(() => {
    if (!username) return;

    (async () => {
      setLoading(true);
      try {
        // Look up the user doc by username field (case-insensitive)
        const usersRef = collection(db, 'users');
        const q        = query(usersRef, where('username', '==', username.toLowerCase()), limit(1));
        const snap     = await getDocs(q);

        if (snap.empty) {
          console.log('❌ No user found with username:', username);
          setNotFound(true);
          setLoading(false);
          return;
        }

        const userDoc  = snap.docs[0];
        const data     = userDoc.data() as UserProfile;
        
        console.log('✅ Found user:', { username: data.username, isPublic: data.isPublic });
        
        // Check if profile is public
        if (data.isPublic === false) {
          console.log('🔒 Profile is private');
          setNotFound(true);
          setLoading(false);
          return;
        }
        
        setProfile({ ...data, uid: userDoc.id });

        // Fetch the user's links sub-collection
        const linksSnap = await getDocs(
          query(
            collection(db, 'users', userDoc.id, 'links'),
            orderBy('_createdAt', 'desc')
          )
        );
        const fetchedLinks: DevLink[] = linksSnap.docs.map(d => ({
          id:          d.id,
          userId:      userDoc.id,
          ...(d.data() as Omit<DevLink, 'id' | 'userId'>),
        }));
        // Pinned first, then by creation order
        setLinks([
          ...fetchedLinks.filter(l => l.pinned),
          ...fetchedLinks.filter(l => !l.pinned),
        ]);
      } catch (err) {
        console.error('❌ Error fetching profile:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950">
        <Spinner size="xl" />
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950 px-4">
        <ErrorState
          title="Profile not found"
          description={`No public profile exists for "@${username}".`}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 py-12 px-4">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card p-8 text-center"
        >
          <div className="flex justify-center mb-4">
            <Avatar name={profile.displayName} src={profile.avatarUrl || undefined} size="2xl" rounded="full" />
          </div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">
            {profile.displayName}
          </h1>
          <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">@{profile.username}</p>

          {profile.bio && (
            <p className="mt-3 text-sm text-surface-600 dark:text-surface-300 leading-relaxed max-w-sm mx-auto">
              {profile.bio}
            </p>
          )}

          <div className="mt-4 flex items-center justify-center flex-wrap gap-3 text-sm text-surface-500 dark:text-surface-400">
            {profile.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />{profile.location}
              </span>
            )}
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-brand-600 dark:text-brand-400 hover:underline"
              >
                <Globe className="h-4 w-4" />{displayUrl(profile.website)}
              </a>
            )}
          </div>

          {/* Social links */}
          {profile.socialLinks?.length > 0 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              {profile.socialLinks.map(sl => (
                <a
                  key={sl.id}
                  href={sl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl text-surface-400 hover:text-surface-600 hover:bg-surface-100 dark:hover:text-surface-200 dark:hover:bg-surface-700 transition-colors"
                  aria-label={sl.platform}
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              ))}
            </div>
          )}
        </motion.div>

        {/* Skills */}
        {profile.skills?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="card p-5"
          >
            <h2 className="text-xs font-semibold uppercase tracking-wider text-surface-400 dark:text-surface-500 mb-3">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map(skill => (
                <Badge key={skill} variant="brand">{skill}</Badge>
              ))}
            </div>
          </motion.div>
        )}

        {/* Links */}
        {links.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="space-y-3"
          >
            <h2 className="text-xs font-semibold uppercase tracking-wider text-surface-400 dark:text-surface-500 px-1">
              Links
            </h2>
            {links.map((link, i) => (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                whileHover={{ y: -2, scale: 1.01 }}
                className="card p-4 flex items-center gap-4 group cursor-pointer"
              >
                <div className="h-10 w-10 rounded-xl bg-surface-100 dark:bg-surface-700 flex items-center justify-center shrink-0 text-surface-500">
                  <ExternalLink className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-surface-900 dark:text-surface-50 text-sm truncate">
                    {link.title}
                  </p>
                  <p className="text-xs text-surface-400 truncate">{displayUrl(link.url)}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-surface-300 group-hover:text-brand-500 transition-colors shrink-0" />
              </motion.a>
            ))}
          </motion.div>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-surface-400 pb-4">
          Powered by{' '}
          <a href="/" className="text-brand-500 hover:underline font-medium">DevLink</a>
        </p>
      </div>
    </div>
  );
}
