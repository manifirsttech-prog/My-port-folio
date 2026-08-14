import { AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Button } from '../buttons/Button';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-6 text-center', className)}>
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-950/30 dark:text-red-400">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h3 className="text-base font-semibold text-surface-800 dark:text-surface-200">{title}</h3>
      {description && (
        <p className="mt-1.5 text-sm text-surface-500 dark:text-surface-400 max-w-xs">{description}</p>
      )}
      {onRetry && (
        <Button variant="secondary" size="sm" className="mt-5" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
