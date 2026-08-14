import { cn } from '../../lib/cn';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
}

const sizeMap = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-8 w-8', xl: 'h-12 w-12' };

export function Spinner({ size = 'md', className, label = 'Loading…' }: SpinnerProps) {
  return (
    <svg
      className={cn('animate-spin text-brand-500', sizeMap[size], className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-label={label}
      role="status"
    >
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z" />
    </svg>
  );
}
