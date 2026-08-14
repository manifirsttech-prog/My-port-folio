import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle, UserCircle, ExternalLink, Settings } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const ACTIONS = [
  { icon: PlusCircle,   label: 'Add Link',       desc: 'Add a new developer link', href: '/dashboard/links',    color: 'text-brand-600 bg-brand-50 dark:bg-brand-950/40 dark:text-brand-400' },
  { icon: UserCircle,   label: 'Edit Profile',   desc: 'Update your info',          href: '/dashboard/profile',  color: 'text-violet-600 bg-violet-50 dark:bg-violet-950/40 dark:text-violet-400' },
  { icon: ExternalLink, label: 'View Profile',   desc: 'See your public page',       href: '',                    color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400', external: true },
  { icon: Settings,     label: 'Settings',       desc: 'Preferences & privacy',      href: '/dashboard/settings', color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400' },
];

export function QuickActions() {
  const { user } = useAuth();

  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-surface-800 dark:text-surface-200 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {ACTIONS.map((action, i) => {
          const href = action.external ? `/profile/${user?.username ?? 'me'}` : action.href;
          const linkProps = action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

          return (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
            >
              <Link
                to={href}
                {...linkProps}
                className="flex flex-col gap-2 p-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors group"
              >
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${action.color}`}>
                  <action.icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-surface-800 dark:text-surface-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {action.label}
                  </p>
                  <p className="text-xs text-surface-400">{action.desc}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
