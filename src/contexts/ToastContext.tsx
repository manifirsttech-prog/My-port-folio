import { createContext, useContext, useState, useCallback } from 'react';
import { ToastContainer } from '../components/feedback/Toast';
import type { ToastMessage, ToastType } from '../components/feedback/Toast';
import { generateId } from '../utils';

interface ToastContextValue {
  toast: (type: ToastType, title: string, description?: string, duration?: number) => void;
  success: (title: string, description?: string) => void;
  error:   (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info:    (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts(ts => ts.filter(t => t.id !== id));
  }, []);

  const toast = useCallback((type: ToastType, title: string, description?: string, duration?: number) => {
    const id = generateId();
    setToasts(ts => [...ts, { id, type, title, description, duration }]);
  }, []);

  const success = useCallback((title: string, d?: string) => toast('success', title, d), [toast]);
  const error   = useCallback((title: string, d?: string) => toast('error',   title, d), [toast]);
  const warning = useCallback((title: string, d?: string) => toast('warning', title, d), [toast]);
  const info    = useCallback((title: string, d?: string) => toast('info',    title, d), [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, warning, info }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}
