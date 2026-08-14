import { cn } from '../../lib/cn';

interface InfoCardProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  accent?: boolean;
  className?: string;
}

export function InfoCard({ title, description, icon, footer, children, accent = false, className }: InfoCardProps) {
  return (
    <div className={cn(
      'card p-5',
      accent && 'border-brand-200 dark:border-brand-800/50 bg-brand-50/50 dark:bg-brand-950/20',
      className
    )}>
      {(icon || title) && (
        <div className="flex items-start gap-3 mb-3">
          {icon && (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400">
              {icon}
            </div>
          )}
          <div>
            {title && <h3 className="text-sm font-semibold text-surface-900 dark:text-surface-50">{title}</h3>}
            {description && <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">{description}</p>}
          </div>
        </div>
      )}
      {children}
      {footer && (
        <div className="mt-4 pt-3 border-t border-surface-100 dark:border-surface-700">
          {footer}
        </div>
      )}
    </div>
  );
}
