import { cn } from '../../lib/cn';
import { Button } from '../buttons/Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-6 text-center', className)}>
      {icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-100 text-surface-400 dark:bg-surface-800 dark:text-surface-500">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-surface-800 dark:text-surface-200">{title}</h3>
      {description && (
        <p className="mt-1.5 text-sm text-surface-500 dark:text-surface-400 max-w-xs">{description}</p>
      )}
      {action && (
        <Button className="mt-5" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
