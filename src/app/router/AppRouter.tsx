import { Routes, Route, Navigate } from 'react-router-dom';

// Guards
import { ProtectedRoute } from './ProtectedRoute';

// Providers that only need to be alive while authenticated
import { LinksProvider }   from '../../contexts/LinksContext';
import { ProfileProvider } from '../../contexts/ProfileContext';

// Layouts
import { MainLayout }      from '../layouts/MainLayout';
import { AuthLayout }      from '../layouts/AuthLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';

// Public pages
import { LandingPage }        from '../../pages/landing/LandingPage';
import { LoginPage }          from '../../pages/login/LoginPage';
import { RegisterPage }       from '../../pages/register/RegisterPage';
import { ForgotPasswordPage } from '../../pages/forgot-password/ForgotPasswordPage';
import { PublicProfilePage }  from '../../pages/public-profile/PublicProfilePage';
import { NotFoundPage }       from '../../pages/not-found/NotFoundPage';

// Dashboard pages
import { OverviewPage }    from '../../dashboards/user/pages/OverviewPage';
import { MyLinksPage }     from '../../dashboards/user/pages/MyLinksPage';
import { EditProfilePage } from '../../dashboards/user/pages/EditProfilePage';
import { SettingsPage }    from '../../dashboards/user/pages/SettingsPage';

/**
 * Thin wrapper that mounts data providers only for authenticated sessions.
 * This keeps Firestore listeners from firing before the user is known.
 */
function AuthenticatedProviders({ children }: { children: React.ReactNode }) {
  return (
    <ProfileProvider>
      <LinksProvider>
        {children}
      </LinksProvider>
    </ProfileProvider>
  );
}

export function AppRouter() {
  return (
    <Routes>
      {/* ── Public / Marketing ── */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* ── Auth ── */}
      <Route element={<AuthLayout />}>
        <Route path="/login"           element={<LoginPage />} />
        <Route path="/register"        element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* ── Public profile (standalone — no layout) ── */}
      <Route path="/profile/:username" element={<PublicProfilePage />} />

      {/* ── Dashboard (protected) ── */}
      <Route element={<ProtectedRoute />}>
        <Route
          element={
            <AuthenticatedProviders>
              <DashboardLayout />
            </AuthenticatedProviders>
          }
        >
          <Route path="/dashboard"          element={<OverviewPage />} />
          <Route path="/dashboard/links"    element={<MyLinksPage />} />
          <Route path="/dashboard/profile"  element={<EditProfilePage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          <Route path="/dashboard/*"        element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Route>

      {/* ── 404 ── */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
