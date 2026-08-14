import { MapPin, Globe, Link2 } from 'lucide-react';
import { cn } from '../../lib/cn';
import { getInitials } from '../../utils';
import type { Profile } from '../../types';

interface ProfileCardProps {
  profile: Profile;
  className?: string;
  compact?: boolean;
}

export function ProfileCard({ profile, className, compact = false }: ProfileCardProps) {
  return (
    <div className={cn('card p-6', className)}>
      <div className={cn('flex gap-4', compact ? 'items-center' : 'items-start flex-col sm:flex-row')}>
        {/* Avatar */}
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt={profile.displayName}
            className={cn('rounded-2xl object-cover bg-surface-100', compact ? 'h-12 w-12' : 'h-20 w-20')}
          />
        ) : (
          <div className={cn(
            'rounded-2xl bg-brand-600 flex items-center justify-center text-white font-bold',
            compact ? 'h-12 w-12 text-sm' : 'h-20 w-20 text-xl'
          )}>
            {getInitials(profile.displayName)}
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-surface-900 dark:text-surface-50 truncate">
            {profile.displayName}
          </h3>
          <p className="text-sm text-surface-500 dark:text-surface-400">@{profile.username}</p>

          {!compact && profile.bio && (
            <p className="mt-2 text-sm text-surface-600 dark:text-surface-300 line-clamp-2">{profile.bio}</p>
          )}

          {!compact && (
            <div className="mt-3 flex flex-wrap gap-3">
              {profile.location && (
                <span className="flex items-center gap-1 text-xs text-surface-500">
                  <MapPin className="h-3.5 w-3.5" /> {profile.location}
                </span>
              )}
              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-brand-600 hover:underline dark:text-brand-400"
                >
                  <Globe className="h-3.5 w-3.5" /> {profile.website.replace(/^https?:\/\//, '')}
                </a>
              )}
              <span className="flex items-center gap-1 text-xs text-surface-500">
                <Link2 className="h-3.5 w-3.5" /> {profile.socialLinks.length} social links
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Skills */}
      {!compact && profile.skills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {profile.skills.map(skill => (
            <span
              key={skill}
              className="badge bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
