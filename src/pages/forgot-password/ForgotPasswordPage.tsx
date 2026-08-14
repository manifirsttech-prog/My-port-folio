import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Mail, ArrowLeft } from 'lucide-react';
import { auth } from '../../lib/firebase';
import { forgotPasswordSchema, type ForgotPasswordSchema } from '../../lib/validations';
import { Button } from '../../components/buttons/Button';
import { TextInput } from '../../components/inputs/TextInput';
import { SuccessState } from '../../components/feedback/SuccessState';

export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    // We always show the success screen regardless of whether the email exists
    // to avoid leaking which emails are registered (standard security practice).
    try {
      await sendPasswordResetEmail(auth, data.email);
    } catch {
      // Silently ignore — show success UI either way
    }
    setSent(true);
  };

  if (sent) {
    return (
      <SuccessState
        title="Check your email"
        description="If an account exists for that address, we've sent a password reset link. Check your inbox and spam folder."
        action={{
          label: 'Back to Login',
          onClick: () => window.location.replace('/login'),
        }}
      />
    );
  }

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">Reset password</h1>
        <p className="mt-1.5 text-sm text-surface-500 dark:text-surface-400">
          Enter your email and we'll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <TextInput
          label="Email"
          type="email"
          placeholder="alex@example.com"
          autoComplete="email"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          disabled={isSubmitting}
          {...register('email')}
        />
        <Button type="submit" fullWidth size="lg" loading={isSubmitting}>
          Send Reset Link
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
      </div>
    </div>
  );
}
