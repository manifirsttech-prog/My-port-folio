import type { LinkCategory } from '../types';
import { LINK_CATEGORIES } from '../constants';

/** Format a number compactly: 1200 → "1.2k" */
export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

/** Format an ISO date string to a readable format */
export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions): string {
  const defaults: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(iso).toLocaleDateString('en-US', opts ?? defaults);
}

/** Return the CSS badge classes for a link category */
export function getCategoryColor(category: LinkCategory): string {
  return LINK_CATEGORIES.find(c => c.value === category)?.color ??
    'bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-300';
}

/** Return a human-readable label for a link category */
export function getCategoryLabel(category: LinkCategory): string {
  return LINK_CATEGORIES.find(c => c.value === category)?.label ?? 'Other';
}

/** Generate an avatar URL from DiceBear */
export function avatarUrl(seed: string): string {
  return `https://api.dicebear.com/8.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
}

/** Validate that a string is a well-formed URL */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/** Slugify a string into a URL-safe username */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Truncate a string to a max length, appending '…' */
export function truncate(str: string, max: number): string {
  return str.length > max ? `${str.slice(0, max)}…` : str;
}

/** Strip the protocol from a URL for display */
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '');
}

/** Get initials from a full name */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
}

/** Generate a unique ID (mock — replace with crypto.randomUUID() or nanoid in production) */
export function generateId(): string {
  return `id_${Math.random().toString(36).slice(2, 10)}`;
}
