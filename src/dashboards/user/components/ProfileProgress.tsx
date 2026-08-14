import { Link } from 'react-router-dom';
import { CheckCircle2, Circle } from 'lucide-react';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import { useProfile } from '../../../contexts/ProfileContext';
import { useLinks } from '../../../contexts/LinksContext';

export function ProfileProgress() {
  const { profile } = useProfile();
  const { links }   = useLinks();

  // Each item is a check against live profile/links data
  const TASKS = [
    { label: 'Add your name',          done: !!profile?.displayName,             href: '/dashboard/profile' },
    { label: 'Write a bio',            done: !!profile?.bio,                      href: '/dashboard/profile' },
    { label: 'Upload a profile picture',done: !!profile?.avatarUrl,              href: '/dashboard/profile' },
    { label: 'Add at least one link',  done: links.length > 0,                   href: '/dashboard/links'   },
    { label: 'Set your location',      done: !!profile?.location,                 href: '/dashboard/profile' },
    { label: 'Add your skills',        done: (profile?.skills?.length ?? 0) > 0, href: '/dashboard/profile' },
  ];

  const done = TASKS.filter(t => t.done).length;
  const pct  = Math.round((done / TASKS.length) * 100);

  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-surface-800 dark:text-surface-200">
          Profile Completion
        </h3>
        <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{pct}%</span>
      </div>

      <ProgressBar
        value={pct}
        size="md"
        color={pct >= 80 ? 'green' : pct >= 50 ? 'brand' : 'amber'}
      />

      <ul className="space-y-2">
        {TASKS.map(task => (
          <li key={task.label} className="flex items-center gap-2.5">
            {task.done ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            ) : (
              <Circle className="h-4 w-4 text-surface-300 dark:text-surface-600 shrink-0" />
            )}
            <Link
              to={task.href}
              className={`text-xs transition-colors ${
                task.done
                  ? 'line-through text-surface-400'
                  : 'text-surface-600 dark:text-surface-300 hover:text-brand-600 dark:hover:text-brand-400'
              }`}
            >
              {task.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
