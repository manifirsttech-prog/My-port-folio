import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Spinner } from '../../components/loaders/Spinner';

/**
 * Wraps dashboard routes.
 * - While Firebase resolves the first auth check → shows a full-screen spinner.
 * - If the user is not authenticated → redirects to /login, preserving the
 *   intended destination in location state so we can redirect back after login.
 * - If authenticated → renders the child routes via <Outlet />.
 */
export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface-50 dark:bg-surface-950">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}
