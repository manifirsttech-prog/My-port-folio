import { forwardRef } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../lib/cn';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  wrapperClassName?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onClear, wrapperClassName, className, value, ...props }, ref) => (
    <div className={cn('relative', wrapperClassName)}>
      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-surface-400">
        <Search className="h-4 w-4" />
      </span>
      <input
        ref={ref}
        value={value}
        type="search"
        className={cn(
          'input-base pl-9',
          value && onClear && 'pr-9',
          className
        )}
        {...props}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
);

SearchInput.displayName = 'SearchInput';
