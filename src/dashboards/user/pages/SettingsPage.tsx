import { useState } from 'react';
import { Moon, Sun, Monitor, Bell, Lock, Trash2, Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useToast } from '../../../contexts/ToastContext';
import { Button } from '../../../components/buttons/Button';
import { ConfirmModal } from '../../../components/modals/ConfirmModal';
import { Divider } from '../../../components/ui/Divider';
import { cn } from '../../../lib/cn';
import type { Theme } from '../../../types';

const THEME_OPTIONS: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: 'light',  label: 'Light',  icon: <Sun className="h-4 w-4" /> },
  { value: 'dark',   label: 'Dark',   icon: <Moon className="h-4 w-4" /> },
  { value: 'system', label: 'System', icon: <Monitor className="h-4 w-4" /> },
];

interface ToggleProps { checked: boolean; onChange: () => void; label: string; }
function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200',
        checked ? 'bg-brand-600' : 'bg-surface-200 dark:bg-surface-700'
      )}
    >
      <span className={cn(
        'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200',
        checked ? 'translate-x-5' : 'translate-x-0'
      )} />
    </button>
  );
}

interface SettingRowProps { label: string; description?: string; children: React.ReactNode; }
function SettingRow({ label, description, children }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium text-surface-800 dark:text-surface-200">{label}</p>
        {description && <p className="text-xs text-surface-400 dark:text-surface-500 mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { success, warning } = useToast();
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Notification prefs
  const [notifs, setNotifs] = useState({
    emailClicks:   true,
    emailDigest:   false,
    emailMarketing: false,
  });

  // Privacy prefs
  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showEmail:     false,
    showLocation:  true,
  });

  const toggle = <K extends keyof typeof notifs>(k: K) =>
    setNotifs(n => ({ ...n, [k]: !n[k] }));

  const togglePrivacy = <K extends keyof typeof privacy>(k: K) =>
    setPrivacy(p => ({ ...p, [k]: !p[k] }));

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">Settings</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
          Manage your account preferences.
        </p>
      </div>

      {/* Theme */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sun className="h-4.5 w-4.5 text-surface-500" />
          <h2 className="text-sm font-semibold text-surface-800 dark:text-surface-200">Appearance</h2>
        </div>
        <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">Choose how DevLink looks to you.</p>
        <div className="flex gap-3">
          {THEME_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { setTheme(opt.value); success('Theme updated', `Switched to ${opt.label} mode.`); }}
              className={cn(
                'flex flex-1 flex-col items-center gap-2 rounded-xl border-2 p-4 text-sm font-medium transition-all',
                theme === opt.value
                  ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300'
                  : 'border-surface-200 text-surface-600 hover:border-surface-300 dark:border-surface-700 dark:text-surface-400 dark:hover:border-surface-600'
              )}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-1">
          <Bell className="h-4.5 w-4.5 text-surface-500" />
          <h2 className="text-sm font-semibold text-surface-800 dark:text-surface-200">Notifications</h2>
        </div>
        <p className="text-xs text-surface-400 mb-3">Control the emails you receive from DevLink.</p>
        <div className="divide-y divide-surface-100 dark:divide-surface-700">
          <SettingRow label="Link clicks" description="Email me when someone clicks my links">
            <Toggle checked={notifs.emailClicks} onChange={() => toggle('emailClicks')} label="Email on link clicks" />
          </SettingRow>
          <SettingRow label="Weekly digest" description="A weekly summary of your profile stats">
            <Toggle checked={notifs.emailDigest} onChange={() => toggle('emailDigest')} label="Weekly digest" />
          </SettingRow>
          <SettingRow label="Marketing emails" description="Product updates and tips">
            <Toggle checked={notifs.emailMarketing} onChange={() => toggle('emailMarketing')} label="Marketing emails" />
          </SettingRow>
        </div>
        <Button size="sm" className="mt-4" onClick={() => success('Saved', 'Notification preferences updated.')}>
          Save Preferences
        </Button>
      </div>

      {/* Privacy */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-1">
          {privacy.publicProfile ? <Eye className="h-4.5 w-4.5 text-surface-500" /> : <EyeOff className="h-4.5 w-4.5 text-surface-500" />}
          <h2 className="text-sm font-semibold text-surface-800 dark:text-surface-200">Privacy</h2>
        </div>
        <p className="text-xs text-surface-400 mb-3">Control what others can see on your public profile.</p>
        <div className="divide-y divide-surface-100 dark:divide-surface-700">
          <SettingRow label="Public profile" description="Allow anyone to view your DevLink profile">
            <Toggle checked={privacy.publicProfile} onChange={() => togglePrivacy('publicProfile')} label="Public profile" />
          </SettingRow>
          <SettingRow label="Show email" description="Display your email on your public profile">
            <Toggle checked={privacy.showEmail} onChange={() => togglePrivacy('showEmail')} label="Show email" />
          </SettingRow>
          <SettingRow label="Show location" description="Display your location on your public profile">
            <Toggle checked={privacy.showLocation} onChange={() => togglePrivacy('showLocation')} label="Show location" />
          </SettingRow>
        </div>
        <Button size="sm" className="mt-4" onClick={() => success('Saved', 'Privacy preferences updated.')}>
          Save Preferences
        </Button>
      </div>

      {/* Security */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="h-4.5 w-4.5 text-surface-500" />
          <h2 className="text-sm font-semibold text-surface-800 dark:text-surface-200">Security</h2>
        </div>
        <div className="space-y-3">
          <Button
            variant="secondary"
            fullWidth
            onClick={() => warning('Demo mode', 'Password change coming with Firebase integration.')}
          >
            Change Password
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => warning('Demo mode', '2FA setup coming with Firebase integration.')}
          >
            Enable Two-Factor Authentication
          </Button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="card p-6 border-red-200 dark:border-red-900/50">
        <div className="flex items-center gap-2 mb-1">
          <Trash2 className="h-4.5 w-4.5 text-red-500" />
          <h2 className="text-sm font-semibold text-red-600 dark:text-red-400">Danger Zone</h2>
        </div>
        <Divider className="my-3 border-red-100 dark:border-red-900/40" />
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-surface-800 dark:text-surface-200">Delete account</p>
            <p className="text-xs text-surface-400 mt-0.5">
              Permanently delete your account and all associated data. This cannot be undone.
            </p>
          </div>
          <Button variant="danger" size="sm" onClick={() => setDeleteOpen(true)}>
            Delete Account
          </Button>
        </div>
      </div>

      {/* Delete confirm modal */}
      <ConfirmModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => { setDeleteOpen(false); warning('Demo mode', 'Account deletion is not connected in this demo.'); }}
        title="Delete your account?"
        description="This is permanent. All your links, profile data, and stats will be deleted. This action cannot be undone."
        confirmLabel="Yes, delete my account"
        confirmVariant="danger"
      />
    </div>
  );
}
