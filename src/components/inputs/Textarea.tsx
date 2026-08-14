import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
  showCount?: boolean;
  maxLength?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, wrapperClassName, className, id, showCount, maxLength, value, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    const count = typeof value === 'string' ? value.length : 0;

    return (
      <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
        {(label || (showCount && maxLength)) && (
          <div className="flex items-center justify-between">
            {label && (
              <label htmlFor={inputId} className="text-sm font-medium text-surface-700 dark:text-surface-300">
                {label}
                {props.required && <span className="ml-1 text-red-500">*</span>}
              </label>
            )}
            {showCount && maxLength && (
              <span className={cn('text-xs', count > maxLength ? 'text-red-500' : 'text-surface-400')}>
                {count}/{maxLength}
              </span>
            )}
          </div>
        )}
        <textarea
          ref={ref}
          id={inputId}
          value={value}
          maxLength={maxLength}
          className={cn(
            'input-base resize-none min-h-[100px]',
            error && 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-500">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs text-surface-400 dark:text-surface-500">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
