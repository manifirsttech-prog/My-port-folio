import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Button } from '../buttons/Button';
import { APP_NAME } from '../../constants';

const NAV_LINKS = [
  { label: 'Features',    href: '/#features' },
  { label: 'How it Works',href: '/#how-it-works' },
  { label: 'Testimonials',href: '/#testimonials' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-white/90 dark:bg-surface-900/90 backdrop-blur-md shadow-card border-b border-surface-200/80 dark:border-surface-700/80'
          : 'bg-transparent'
      )}
    >
      <div className="page-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl focus-ring rounded-lg px-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Zap className="h-4.5 w-4.5" fill="currentColor" />
            </div>
            <span className="text-gradient">{APP_NAME}</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-50 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-xl text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800 transition-colors"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700 overflow-hidden"
          >
            <div className="page-container py-4 space-y-1">
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium text-surface-700 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <Link to="/login">
                  <Button variant="secondary" fullWidth>Log in</Button>
                </Link>
                <Link to="/register">
                  <Button fullWidth>Get Started</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
