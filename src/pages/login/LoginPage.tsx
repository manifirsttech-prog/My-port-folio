import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { loginSchema, type LoginSchema } from '../../lib/validations';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Button } from '../../components/buttons/Button';
import { TextInput } from '../../components/inputs/TextInput';
import { PasswordInput } from '../../components/inputs/PasswordInput';
import { Divider } from '../../components/ui/Divider';

export function LoginPage() {
  const { login, loginWithGoogle, isLoading } = useAuth();
  const { success, error } = useToast();
  const navigate  = useNavigate();
  const location  = useLocation();

  // Redirect back to the page the user tried to visit before being redirected here
  const from = (location.state as { from?: string })?.from ?? '/dashboard';

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await login(data.email, data.password);
      success('Welcome back!', 'You\'ve been signed in successfully.');
      navigate(from, { replace: true });
    } catch (err) {
      error('Sign-in failed', (err as Error).message);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      success('Welcome!', 'Signed in with Google.');
      navigate(from, { replace: true });
    } catch (err) {
      error('Google sign-in failed', (err as Error).message);
    }
  };

  const busy = isLoading || isSubmitting;

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">Welcome back</h1>
        <p className="mt-1.5 text-sm text-surface-500 dark:text-surface-400">
          Sign in to your DevLink account
        </p>
      </div>

      {/* Google SSO */}
      <Button
        type="button"
        variant="secondary"
        fullWidth
        size="lg"
        loading={busy}
        leftIcon={
          <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        }
        onClick={handleGoogle}
      >
        Continue with Google
      </Button>

      <Divider label="or continue with email" className="my-5" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <TextInput
          label="Email"
          type="email"
          placeholder="alex@example.com"
          autoComplete="email"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          disabled={busy}
          {...register('email')}
        />

        <PasswordInput
          label="Password"
          placeholder="••••••••"
          autoComplete="current-password"
          error={errors.password?.message}
          disabled={busy}
          {...register('password')}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-surface-300 text-brand-600 focus:ring-brand-500"
              {...register('rememberMe')}
            />
            <span className="text-sm text-surface-600 dark:text-surface-400">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth size="lg" loading={busy}>
          Sign In
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 hover:underline"
        >
          Create new Account
        </Link>
      </p>
    </div>
  );
}