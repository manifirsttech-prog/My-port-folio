import { cn } from '../../lib/cn';

interface DividerProps {
  label?: string;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function Divider({ label, className, orientation = 'horizontal' }: DividerProps) {
  if (orientation === 'vertical') {
    return <div className={cn('h-full w-px bg-surface-200 dark:bg-surface-700', className)} />;
  }

  if (label) {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <div className="flex-1 h-px bg-surface-200 dark:bg-surface-700" />
        <span className="text-xs text-surface-400 dark:text-surface-500 font-medium">{label}</span>
        <div className="flex-1 h-px bg-surface-200 dark:bg-surface-700" />
      </div>
    );
  }

  return <hr className={cn('border-surface-200 dark:border-surface-700', className)} />;
}
