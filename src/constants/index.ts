import type { LinkCategory, SocialPlatform } from '../types';

// ─── App ───────────────────────────────────────────────────────────────────────
export const APP_NAME = 'DevLink';
export const APP_TAGLINE = 'One link for all your developer profiles.';
export const APP_DESCRIPTION =
  'DevLink is a platform where developers create a professional public profile and manage all their links in one place.';

// ─── Routes ────────────────────────────────────────────────────────────────────
export const ROUTES = {
  HOME:             '/',
  LOGIN:            '/login',
  REGISTER:         '/register',
  FORGOT_PASSWORD:  '/forgot-password',
  PUBLIC_PROFILE:   '/profile/:username',
  DASHBOARD:        '/dashboard',
  DASHBOARD_LINKS:  '/dashboard/links',
  DASHBOARD_PROFILE:'/dashboard/profile',
  DASHBOARD_SETTINGS:'/dashboard/settings',
  NOT_FOUND:        '*',
} as const;

// ─── Navigation ────────────────────────────────────────────────────────────────
export const DASHBOARD_NAV = [
  { label: 'Overview',     href: '/dashboard',          icon: 'LayoutDashboard' },
  { label: 'My Links',     href: '/dashboard/links',    icon: 'Link2' },
  { label: 'Edit Profile', href: '/dashboard/profile',  icon: 'UserCircle' },
  { label: 'Settings',     href: '/dashboard/settings', icon: 'Settings' },
] as const;

// ─── Link Categories ───────────────────────────────────────────────────────────
export const LINK_CATEGORIES: { value: LinkCategory; label: string; color: string }[] = [
  { value: 'project',    label: 'Project',    color: 'bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300' },
  { value: 'repository', label: 'Repository', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
  { value: 'blog',       label: 'Blog',       color: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300' },
  { value: 'portfolio',  label: 'Portfolio',  color: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300' },
  { value: 'resume',     label: 'Resume',     color: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-300' },
  { value: 'social',     label: 'Social',     color: 'bg-pink-100 text-pink-700 dark:bg-pink-950/50 dark:text-pink-300' },
  { value: 'tool',       label: 'Tool',       color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300' },
  { value: 'other',      label: 'Other',      color: 'bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-300' },
];

// ─── Social Platforms ──────────────────────────────────────────────────────────
export const SOCIAL_PLATFORMS: { value: SocialPlatform; label: string }[] = [
  { value: 'github',    label: 'GitHub' },
  { value: 'linkedin',  label: 'LinkedIn' },
  { value: 'twitter',   label: 'Twitter / X' },
  { value: 'youtube',   label: 'YouTube' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook',  label: 'Facebook' },
  { value: 'website',   label: 'Website' },
  { value: 'other',     label: 'Other' },
];

// ─── Skill suggestions ─────────────────────────────────────────────────────────
export const SKILL_SUGGESTIONS = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Go',
  'Rust', 'Java', 'C#', 'PHP', 'Ruby', 'Swift', 'Kotlin',
  'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'Svelte',
  'Tailwind CSS', 'CSS', 'HTML', 'GraphQL', 'REST API',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase',
  'AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'CI/CD',
  'Git', 'Linux', 'Figma', 'UI/UX Design',
];

// ─── Pagination ────────────────────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 10;
