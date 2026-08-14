import { Link, Outlet } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { APP_NAME } from '../../constants';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-brand-50/30 to-surface-100 dark:from-surface-950 dark:via-brand-950/20 dark:to-surface-900 flex flex-col">
      {/* Header */}
      <div className="flex justify-center pt-8 pb-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-glow">
            <Zap className="h-5 w-5" fill="currentColor" />
          </div>
          <span className="text-gradient">{APP_NAME}</span>
        </Link>
      </div>

      {/* Centered card */}
      <div className="flex flex-1 items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <div className="card shadow-card-lg p-8">
            <Outlet />
          </div>
        </motion.div>
      </div>

      <p className="pb-8 text-center text-xs text-surface-400">
        © {new Date().getFullYear()} {APP_NAME}
      </p>
    </div>
  );
}
