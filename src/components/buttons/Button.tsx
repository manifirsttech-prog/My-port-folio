import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { Size, Variant } from '../../types';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:bg-brand-800 focus-ring disabled:bg-brand-300',
  secondary:
    'bg-white text-surface-700 border border-surface-200 shadow-sm hover:bg-surface-50 hover:border-surface-300 active:bg-surface-100 focus-ring dark:bg-surface-800 dark:text-surface-200 dark:border-surface-600 dark:hover:bg-surface-700 disabled:opacity-50',
  ghost:
    'text-surface-600 hover:bg-surface-100 hover:text-surface-900 active:bg-surface-200 focus-ring dark:text-surface-400 dark:hover:bg-surface-700 dark:hover:text-surface-50 disabled:opacity-50',
  danger:
    'bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800 focus-ring disabled:bg-red-300',
  success:
    'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 active:bg-emerald-800 focus-ring disabled:bg-emerald-300',
  warning:
    'bg-amber-500 text-white shadow-sm hover:bg-amber-600 active:bg-amber-700 focus-ring disabled:bg-amber-300',
};

const sizeClasses: Record<Size, string> = {
  xs: 'h-7 px-2.5 text-xs gap-1.5 rounded-lg',
  sm: 'h-8 px-3 text-sm gap-2 rounded-xl',
  md: 'h-10 px-4 text-sm gap-2 rounded-xl',
  lg: 'h-11 px-5 text-base gap-2 rounded-xl',
  xl: 'h-12 px-6 text-base gap-2.5 rounded-2xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-150 select-none',
          'disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';