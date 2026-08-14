import { cn } from '../../lib/cn';

type BadgeVariant = 'default' | 'brand' | 'success' | 'warning' | 'danger' | 'purple';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-surface-100 text-surface-700 dark:bg-surface-700 dark:text-surface-300',
  brand:   'bg-brand-100 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300',
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
  danger:  'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400',
  purple:  'bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-surface-400',
  brand:   'bg-brand-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger:  'bg-red-500',
  purple:  'bg-violet-500',
};

export function Badge({ children, variant = 'default', className, dot = false }: BadgeProps) {
  return (
    <span className={cn('badge font-medium', variants[variant], className)}>
      {dot && <span className={cn('mr-1.5 h-1.5 w-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
}
