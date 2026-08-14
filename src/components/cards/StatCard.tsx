import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { formatNumber } from '../../utils';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  change?: { value: number; label?: string };
  accent?: 'blue' | 'purple' | 'green' | 'amber' | 'pink';
  className?: string;
}

const accents = {
  blue:   { icon: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400',   bar: 'bg-blue-500' },
  purple: { icon: 'bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400', bar: 'bg-violet-500' },
  green:  { icon: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400', bar: 'bg-emerald-500' },
  amber:  { icon: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400', bar: 'bg-amber-500' },
  pink:   { icon: 'bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400',   bar: 'bg-pink-500' },
};

export function StatCard({ label, value, icon, change, accent = 'blue', className }: StatCardProps) {
  const colors = accents[accent];
  const displayValue = typeof value === 'number' ? formatNumber(value) : value;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn('card p-5 flex flex-col gap-3 overflow-hidden relative', className)}
    >
      <div className="flex items-start justify-between">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', colors.icon)}>
          {icon}
        </div>
        {change !== undefined && (
          <span className={cn(
            'text-xs font-medium px-2 py-0.5 rounded-full',
            change.value >= 0
              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
              : 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400'
          )}>
            {change.value >= 0 ? '+' : ''}{change.value}%
          </span>
        )}
      </div>

      <div>
        <p className="text-2xl font-bold text-surface-900 dark:text-surface-50 tracking-tight">
          {displayValue}
        </p>
        <p className="text-sm text-surface-500 dark:text-surface-400 mt-0.5">{label}</p>
        {change?.label && (
          <p className="text-xs text-surface-400 dark:text-surface-500 mt-1">{change.label}</p>
        )}
      </div>

      {/* Decorative bar */}
      <div className={cn('absolute bottom-0 left-0 h-0.5 w-full', colors.bar)} />
    </motion.div>
  );
}
