import { z } from 'zod';

export const loginSchema = z.object({
  email:      z.string().email('Enter a valid email address'),
  password:   z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
  fullName:        z.string().min(2, 'Full name must be at least 2 characters'),
  email:           z.string().email('Enter a valid email address'),
  password:        z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Enter a valid email address'),
});

export const profileSchema = z.object({
  displayName: z.string().min(2, 'Display name must be at least 2 characters'),
  username:    z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be 30 characters or less')
    .regex(/^[a-z0-9_-]+$/, 'Username may only contain lowercase letters, numbers, - and _'),
  bio:      z.string().max(300, 'Bio must be 300 characters or less').optional().default(''),
  location: z.string().max(100).optional().default(''),
  website:  z.string().optional().or(z.literal('')).default(''),
});

export const linkSchema = z.object({
  title:       z.string().min(1, 'Title is required').max(100),
  url:         z.string().url('Enter a valid URL'),
  description: z.string().max(300).optional().default(''),
  category:    z.enum(['project','repository','blog','portfolio','resume','social','tool','other']),
  pinned:      z.boolean().optional().default(false),
});

export type LoginSchema          = z.infer<typeof loginSchema>;
export type RegisterSchema       = z.infer<typeof registerSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ProfileSchema        = z.infer<typeof profileSchema>;
export type LinkSchema           = z.infer<typeof linkSchema>;
