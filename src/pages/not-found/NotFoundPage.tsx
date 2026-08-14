import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/buttons/Button';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        {/* Illustration */}
        <div className="mx-auto mb-8 relative w-48 h-48">
          <div className="absolute inset-0 rounded-full bg-brand-100 dark:bg-brand-950/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl font-extrabold text-brand-200 dark:text-brand-800 select-none">404</span>
          </div>
          {/* Floating dots decoration */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-4 right-4 h-4 w-4 rounded-full bg-brand-400"
          />
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute bottom-6 left-4 h-3 w-3 rounded-full bg-brand-300"
          />
        </div>

        <h1 className="text-3xl font-extrabold text-surface-900 dark:text-surface-50 tracking-tight">
          Page not found
        </h1>
        <p className="mt-3 text-surface-500 dark:text-surface-400">
          Looks like this page took a wrong turn. It might have been moved or deleted.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/">
            <Button leftIcon={<Home className="h-4 w-4" />} size="lg">
              Return Home
            </Button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Go back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
