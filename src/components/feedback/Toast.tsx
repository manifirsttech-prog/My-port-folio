import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../../lib/cn';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastItemProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
  error:   <XCircle className="h-5 w-5 text-red-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  info:    <Info className="h-5 w-5 text-blue-500" />,
};

const borders: Record<ToastType, string> = {
  success: 'border-l-emerald-500',
  error:   'border-l-red-500',
  warning: 'border-l-amber-500',
  info:    'border-l-blue-500',
};

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(toast.id), toast.duration ?? 4000);
    return () => clearTimeout(t);
  }, [toast, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      className={cn(
        'card flex items-start gap-3 p-4 w-80 shadow-card-md border-l-4',
        borders[toast.type]
      )}
    >
      <span className="shrink-0 mt-0.5">{icons[toast.type]}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-surface-800 dark:text-surface-100">{toast.title}</p>
        {toast.description && (
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">{toast.description}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div
      aria-live="polite"
      className="fixed top-4 right-4 z-[9999] flex flex-col gap-2"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}
