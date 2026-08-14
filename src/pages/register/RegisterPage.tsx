import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail } from 'lucide-react';
import { registerSchema, type RegisterSchema } from '../../lib/validations';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Button } from '../../components/buttons/Button';
import { TextInput } from '../../components/inputs/TextInput';
import { PasswordInput } from '../../components/inputs/PasswordInput';
import { Divider } from '../../components/ui/Divider';

export function RegisterPage() {
  const { register: registerUser, registerWithGoogle } = useAuth();
  const { success, error }                             = useToast();
  const navigate                                       = useNavigate();

  const inFlight = useRef(false);

  const [formLoading,   setFormLoading]   = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const anyBusy = formLoading || googleLoading;

  const onSubmit = async (data: RegisterSchema) => {
    if (inFlight.current) return;
    inFlight.current = true;
    setFormLoading(true);
    try {
      await registerUser(data.fullName, data.email, data.password);
      success('Account created!', 'Welcome to DevLink.');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      error('Registration failed', (err as Error).message);
      inFlight.current = false;
      setFormLoading(false);
    }
  };

  const handleGoogle = async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    setGoogleLoading(true);
    try {
      await registerWithGoogle();
      success('Account created!', 'Welcome to DevLink.');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      error('Google sign-up failed', (err as Error).message);
      inFlight.current = false;
      setGoogleLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">Create your account</h1>
        <p className="mt-1.5 text-sm text-surface-500 dark:text-surface-400">
          Join thousands of developers on DevLink
        </p>
      </div>

      <Button
        type="button"
        variant="secondary"
        fullWidth
        size="lg"
        loading={googleLoading}
        disabled={anyBusy}
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

      <Divider label="or sign up with email" className="my-5" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <TextInput
          label="Full Name"
          placeholder="Alex Johnson"
          autoComplete="name"
          leftIcon={<User className="h-4 w-4" />}
          error={errors.fullName?.message}
          disabled={anyBusy}
          {...register('fullName')}
        />
        <TextInput
          label="Email"
          type="email"
          placeholder="alex@example.com"
          autoComplete="email"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          disabled={anyBusy}
          {...register('email')}
        />
        <PasswordInput
          label="Password"
          placeholder="Min 8 characters"
          autoComplete="new-password"
          error={errors.password?.message}
          hint="Must contain an uppercase letter and a number"
          disabled={anyBusy}
          {...register('password')}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Repeat password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          disabled={anyBusy}
          {...register('confirmPassword')}
        />

        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={formLoading}
          disabled={anyBusy}
          className="mt-2"
        >
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 hover:underline"
        >
          Sign in
        </Link>
      </p>

      <p className="mt-4 text-center text-xs text-surface-400">
        By signing up, you agree to our{' '}
        <a href="#" className="underline hover:text-surface-600">Terms of Service</a>
        {' '}and{' '}
        <a href="#" className="underline hover:text-surface-600">Privacy Policy</a>.
      </p>
    </div>
  );
}
