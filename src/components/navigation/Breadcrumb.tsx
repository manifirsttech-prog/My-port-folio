import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../lib/cn';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const AUTO_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  links:     'My Links',
  profile:   'Edit Profile',
  settings:  'Settings',
};

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const location = useLocation();

  // Auto-generate from pathname if not provided
  const crumbs: BreadcrumbItem[] = items ?? (() => {
    const parts = location.pathname.split('/').filter(Boolean);
    return parts.map((part, i) => ({
      label: AUTO_LABELS[part] ?? part.charAt(0).toUpperCase() + part.slice(1),
      href:  i < parts.length - 1 ? '/' + parts.slice(0, i + 1).join('/') : undefined,
    }));
  })();

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1 text-sm', className)}>
      <Link
        to="/dashboard"
        className="text-surface-400 hover:text-surface-600 dark:text-surface-500 dark:hover:text-surface-300 transition-colors"
        aria-label="Dashboard home"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>

      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="h-3.5 w-3.5 text-surface-300 dark:text-surface-600" />
          {crumb.href ? (
            <Link
              to={crumb.href}
              className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200 transition-colors"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="text-surface-800 dark:text-surface-200 font-medium" aria-current="page">
              {crumb.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
