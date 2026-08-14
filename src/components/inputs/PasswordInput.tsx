import { forwardRef, useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { TextInput, type TextInputProps } from './TextInput';

type PasswordInputProps = Omit<TextInputProps, 'type' | 'leftIcon' | 'rightIcon'>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const [show, setShow] = useState(false);

  return (
    <TextInput
      ref={ref}
      type={show ? 'text' : 'password'}
      leftIcon={<Lock className="h-4 w-4" />}
      rightIcon={
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          className="pointer-events-auto text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors"
          aria-label={show ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      }
      {...props}
    />
  );
});

PasswordInput.displayName = 'PasswordInput';
