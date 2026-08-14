import { ExternalLink, Pencil, Trash2, Pin } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { getCategoryColor, getCategoryLabel, displayUrl } from '../../utils';
import { IconButton } from '../buttons/IconButton';
import type { DevLink } from '../../types';

interface LinkCardProps {
  link: DevLink;
  onEdit?: (link: DevLink) => void;
  onDelete?: (link: DevLink) => void;
  readOnly?: boolean;
  className?: string;
}

export function LinkCard({ link, onEdit, onDelete, readOnly = false, className }: LinkCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'card p-4 flex items-center gap-4 group',
        className
      )}
    >
      {/* Category dot / icon */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-100 dark:bg-surface-700">
        <ExternalLink className="h-5 w-5 text-surface-500 dark:text-surface-400" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-medium text-surface-900 dark:text-surface-50 truncate text-sm">
            {link.title}
          </h4>
          {link.pinned && (
            <Pin className="h-3.5 w-3.5 text-brand-500 shrink-0" aria-label="Pinned" />
          )}
          <span className={cn('badge text-xs', getCategoryColor(link.category))}>
            {getCategoryLabel(link.category)}
          </span>
        </div>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-brand-600 hover:underline dark:text-brand-400 truncate block mt-0.5"
          onClick={e => e.stopPropagation()}
        >
          {displayUrl(link.url)}
        </a>
        {link.description && (
          <p className="text-xs text-surface-400 dark:text-surface-500 truncate mt-0.5">{link.description}</p>
        )}
      </div>

      {/* Clicks */}
      <div className="hidden sm:flex flex-col items-center text-center shrink-0 w-14">
        <span className="text-sm font-semibold text-surface-700 dark:text-surface-200">
          {link.clicks.toLocaleString()}
        </span>
        <span className="text-xs text-surface-400">clicks</span>
      </div>

      {/* Actions */}
      {!readOnly && (
        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <IconButton
              icon={<Pencil className="h-4 w-4" />}
              label={`Edit ${link.title}`}
              size="sm"
              onClick={() => onEdit(link)}
            />
          )}
          {onDelete && (
            <IconButton
              icon={<Trash2 className="h-4 w-4" />}
              label={`Delete ${link.title}`}
              size="sm"
              variant="danger"
              onClick={() => onDelete(link)}
            />
          )}
        </div>
      )}
    </motion.div>
  );
}
