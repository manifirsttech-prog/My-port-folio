import { CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Button } from '../buttons/Button';

interface SuccessStateProps {
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export function SuccessState({ title, description, action, className }: SuccessStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-6 text-center', className)}>
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500 dark:bg-emerald-950/30 dark:text-emerald-400">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <h3 className="text-base font-semibold text-surface-800 dark:text-surface-200">{title}</h3>
      {description && (
        <p className="mt-1.5 text-sm text-surface-500 dark:text-surface-400 max-w-xs">{description}</p>
      )}
      {action && (
        <Button size="sm" className="mt-5" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
