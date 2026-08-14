import { Link } from 'react-router-dom';
import { Zap, ExternalLink } from 'lucide-react';
import { APP_NAME } from '../../constants';

const FOOTER_LINKS = {
  Product:  [{ label: 'Features', href: '/#features' }, { label: 'How it Works', href: '/#how-it-works' }],
  Company:  [{ label: 'About', href: '#' }, { label: 'Blog', href: '#' }],
  Legal:    [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }],
};

export function Footer() {
  return (
    <footer className="border-t border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-950">
      <div className="page-container py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Zap className="h-4 w-4" fill="currentColor" />
              </div>
              <span className="text-gradient">{APP_NAME}</span>
            </Link>
            <p className="mt-3 text-sm text-surface-500 dark:text-surface-400 max-w-xs">
              One link for all your developer profiles. Build your professional presence in minutes.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-xl text-surface-400 hover:text-surface-600 hover:bg-surface-100 dark:hover:text-surface-200 dark:hover:bg-surface-800 transition-colors">
                <ExternalLink className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-xl text-surface-400 hover:text-surface-600 hover:bg-surface-100 dark:hover:text-surface-200 dark:hover:bg-surface-800 transition-colors">
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-sm font-semibold text-surface-900 dark:text-surface-100 mb-3">{group}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface-400">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-surface-400">
            Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
