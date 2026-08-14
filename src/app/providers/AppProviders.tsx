import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { AuthProvider }  from '../../contexts/AuthContext';
import { ToastProvider } from '../../contexts/ToastContext';

/**
 * Global providers — available everywhere in the app.
 *
 * LinksProvider and ProfileProvider are intentionally excluded here.
 * They are mounted inside ProtectedRoute (via AuthenticatedProviders in
 * AppRouter) so their Firestore listeners only start once the user is
 * confirmed authenticated, avoiding wasted reads and permission errors.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
