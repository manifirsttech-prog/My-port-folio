import { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Link2, UserCircle, Settings,
  Zap, ChevronLeft, ChevronRight, LogOut,
  Moon, Sun, Bell, Menu, X, ExternalLink,
} from 'lucide-react';
import { cn } from '../../lib/cn';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Avatar } from '../../components/ui/Avatar';
import { IconButton } from '../../components/buttons/IconButton';
import { MobileNav } from '../../components/navigation/MobileNav';
import { Breadcrumb } from '../../components/navigation/Breadcrumb';
import { APP_NAME } from '../../constants';

const NAV_ITEMS = [
  { label: 'Overview',     href: '/dashboard',          icon: LayoutDashboard, end: true },
  { label: 'My Links',     href: '/dashboard/links',    icon: Link2 },
  { label: 'Edit Profile', href: '/dashboard/profile',  icon: UserCircle },
  { label: 'Settings',     href: '/dashboard/settings', icon: Settings },
];

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  return (
    <div className="flex h-screen overflow-hidden bg-surface-50 dark:bg-surface-950">
      {/* ── Desktop Sidebar ─────────────────────────────────── */}
      <aside
        className={cn(
          'hidden md:flex flex-col border-r border-surface-200 dark:border-surface-700',
          'bg-white dark:bg-surface-900 transition-all duration-300 shrink-0',
          collapsed ? 'w-[68px]' : 'w-[260px]'
        )}
      >
        {/* Logo */}
        <div className={cn('flex h-16 items-center border-b border-surface-200 dark:border-surface-700 px-4', collapsed ? 'justify-center' : 'justify-between')}>
          {!collapsed && (
            <Link to="/dashboard" className="flex items-center gap-2 font-bold text-lg">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Zap className="h-4 w-4" fill="currentColor" />
              </div>
              <span className="text-gradient">{APP_NAME}</span>
            </Link>
          )}
          {collapsed && (
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Zap className="h-4 w-4" fill="currentColor" />
            </div>
          )}
          <button
            onClick={() => setCollapsed(c => !c)}
            className={cn(
              'p-1.5 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-100',
              'dark:hover:text-surface-300 dark:hover:bg-surface-800 transition-colors',
              collapsed && 'absolute -right-3 top-[18px] z-10 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-full shadow-sm'
            )}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
          {NAV_ITEMS.map(({ label, href, icon: Icon, end }) => (
            <NavLink
              key={href}
              to={href}
              end={end}
              title={collapsed ? label : undefined}
              className={({ isActive }) =>
                cn('sidebar-link', isActive && 'active', collapsed && 'justify-center px-0')
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}

          {/* Divider */}
          <div className="py-2">
            <div className="h-px bg-surface-200 dark:bg-surface-700" />
          </div>

          <a
            href={`/profile/${user?.username ?? 'me'}`}
            target="_blank"
            rel="noopener noreferrer"
            title={collapsed ? 'View Public Profile' : undefined}
            className={cn('sidebar-link', collapsed && 'justify-center px-0')}
          >
            <ExternalLink className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Public Profile</span>}
          </a>
        </nav>

        {/* User */}
        <div className={cn('p-3 border-t border-surface-200 dark:border-surface-700', collapsed && 'flex justify-center')}>
          {!collapsed ? (
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
              <Avatar name={user?.fullName ?? 'User'} src={user?.avatarUrl} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-surface-800 dark:text-surface-200 truncate">{user?.fullName}</p>
                <p className="text-xs text-surface-400 truncate">@{user?.username}</p>
              </div>
              <button onClick={handleLogout} className="text-surface-400 hover:text-red-500 transition-colors" aria-label="Log out">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button onClick={handleLogout} className="p-2 rounded-xl text-surface-400 hover:text-red-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors" aria-label="Log out">
              <LogOut className="h-5 w-5" />
            </button>
          )}
        </div>
      </aside>

      {/* ── Mobile Sidebar Overlay ───────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-700 flex flex-col md:hidden"
            >
              <div className="flex h-16 items-center justify-between px-4 border-b border-surface-200 dark:border-surface-700">
                <Link to="/dashboard" className="flex items-center gap-2 font-bold text-lg" onClick={() => setMobileOpen(false)}>
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-brand-600 text-white">
                    <Zap className="h-4 w-4" fill="currentColor" />
                  </div>
                  <span className="text-gradient">{APP_NAME}</span>
                </Link>
                <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 py-4 px-2 space-y-0.5">
                {NAV_ITEMS.map(({ label, href, icon: Icon, end }) => (
                  <NavLink key={href} to={href} end={end} onClick={() => setMobileOpen(false)}
                    className={({ isActive }) => cn('sidebar-link', isActive && 'active')}>
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{label}</span>
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ─────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-xl text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800"
              onClick={() => setMobileOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Breadcrumb className="hidden sm:flex" />
          </div>

          <div className="flex items-center gap-2">
            <IconButton
              icon={resolvedTheme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
              label="Toggle theme"
              onClick={toggleTheme}
              size="sm"
            />
            <IconButton icon={<Bell className="h-4.5 w-4.5" />} label="Notifications" size="sm" />
            <Link to="/dashboard/profile">
              <Avatar name={user?.fullName ?? 'User'} src={user?.avatarUrl} size="sm" className="cursor-pointer ring-2 ring-transparent hover:ring-brand-500 transition-all" />
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-6">
          <div className="page-container py-6">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Outlet />
            </motion.div>
          </div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  );
}
