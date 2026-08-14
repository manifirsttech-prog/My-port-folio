import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

interface ProgressBarProps {
  value: number; // 0–100
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'brand' | 'green' | 'amber' | 'red';
  className?: string;
  animate?: boolean;
}

const colors = {
  brand: 'bg-brand-500',
  green: 'bg-emerald-500',
  amber: 'bg-amber-500',
  red:   'bg-red-500',
};

const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-3' };

export function ProgressBar({
  value,
  label,
  showValue = false,
  size = 'md',
  color = 'brand',
  className,
  animate = true,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-xs font-medium text-surface-600 dark:text-surface-400">{label}</span>}
          {showValue && <span className="text-xs font-semibold text-surface-700 dark:text-surface-300">{pct}%</span>}
        </div>
      )}
      <div className={cn('w-full overflow-hidden rounded-full bg-surface-200 dark:bg-surface-700', heights[size])}>
        {animate ? (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={cn('h-full rounded-full', colors[color])}
          />
        ) : (
          <div className={cn('h-full rounded-full', colors[color])} style={{ width: `${pct}%` }} />
        )}
      </div>
    </div>
  );
}
