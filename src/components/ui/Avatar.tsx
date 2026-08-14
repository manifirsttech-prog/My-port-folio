import { cn } from '../../lib/cn';
import { getInitials } from '../../utils';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  rounded?: 'full' | '2xl' | 'xl';
}

const sizeMap = {
  xs:  'h-6 w-6 text-xs',
  sm:  'h-8 w-8 text-sm',
  md:  'h-10 w-10 text-sm',
  lg:  'h-12 w-12 text-base',
  xl:  'h-16 w-16 text-lg',
  '2xl': 'h-20 w-20 text-xl',
};

const roundedMap = {
  full: 'rounded-full',
  '2xl': 'rounded-2xl',
  xl: 'rounded-xl',
};

export function Avatar({ name, src, size = 'md', className, rounded = '2xl' }: AvatarProps) {
  const initials = getInitials(name);

  return (
    <div
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden',
        'bg-gradient-to-br from-brand-500 to-brand-700 text-white font-semibold',
        sizeMap[size],
        roundedMap[rounded],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
