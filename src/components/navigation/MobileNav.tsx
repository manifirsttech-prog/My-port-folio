import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Link2, UserCircle, Settings } from 'lucide-react';
import { cn } from '../../lib/cn';

const MOBILE_NAV = [
  { label: 'Home',    href: '/dashboard',          icon: LayoutDashboard },
  { label: 'Links',   href: '/dashboard/links',    icon: Link2 },
  { label: 'Profile', href: '/dashboard/profile',  icon: UserCircle },
  { label: 'Settings',href: '/dashboard/settings', icon: Settings },
];

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white dark:bg-surface-900 border-t border-surface-200 dark:border-surface-700">
      <div className="flex items-center justify-around h-16">
        {MOBILE_NAV.map(({ label, href, icon: Icon }) => (
          <NavLink
            key={href}
            to={href}
            end={href === '/dashboard'}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all text-xs font-medium',
                isActive
                  ? 'text-brand-600 dark:text-brand-400'
                  : 'text-surface-400 hover:text-surface-600 dark:hover:text-surface-300'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={cn('h-5 w-5 transition-all', isActive && 'scale-110')} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
