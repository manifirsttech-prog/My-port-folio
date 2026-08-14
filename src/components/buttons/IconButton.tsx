import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { Size, Variant } from '../../types';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: Extract<Variant, 'primary' | 'secondary' | 'ghost' | 'danger'>;
  size?: Size;
  label: string; // required for accessibility
  loading?: boolean;
  rounded?: boolean;
}

const variantClasses = {
  primary:   'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 focus-ring',
  secondary: 'bg-white text-surface-600 border border-surface-200 hover:bg-surface-50 focus-ring dark:bg-surface-800 dark:text-surface-300 dark:border-surface-600 dark:hover:bg-surface-700',
  ghost:     'text-surface-500 hover:bg-surface-100 hover:text-surface-700 active:bg-surface-200 focus-ring dark:text-surface-400 dark:hover:bg-surface-700 dark:hover:text-surface-200',
  danger:    'text-red-500 hover:bg-red-50 hover:text-red-600 active:bg-red-100 focus-ring dark:hover:bg-red-950/40',
};

const sizeClasses: Record<Size, string> = {
  xs: 'h-6 w-6',
  sm: 'h-8 w-8',
  md: 'h-9 w-9',
  lg: 'h-10 w-10',
  xl: 'h-12 w-12',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, variant = 'ghost', size = 'md', label, loading = false, rounded = false, className, disabled, ...props }, ref) => (
    <button
      ref={ref}
      aria-label={label}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center transition-all duration-150 shrink-0 disabled:cursor-not-allowed disabled:opacity-50',
        rounded ? 'rounded-full' : 'rounded-xl',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      ) : (
        icon
      )}
    </button>
  )
);

IconButton.displayName = 'IconButton';
