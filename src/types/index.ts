// ─── User & Auth ──────────────────────────────────────────────────────────────

/**
 * App-level user record — mirrors the Firebase Auth user
 * plus the extra fields we write to Firestore at /users/{uid}.
 */
export interface User {
  uid:        string;   // Firebase Auth uid (primary key)
  email:      string;
  fullName:   string;
  username:   string;
  avatarUrl?: string;
  createdAt:  string;   // ISO string
  updatedAt:  string;
}

export interface AuthState {
  user:            User | null;
  isAuthenticated: boolean;
  /** true while onAuthStateChanged is still resolving on first load */
  isLoading:       boolean;
}

// ─── Firestore user document  (/users/{uid}) ──────────────────────────────────

/**
 * Shape stored in Firestore.  Timestamps are stored as ISO strings so they
 * survive JSON serialisation easily; convert to Firestore Timestamp when
 * writing if you prefer server-side ordering.
 */
export interface UserProfile {
  uid:         string;
  email:       string;
  fullName:    string;
  username:    string;
  displayName: string;
  bio:         string;
  avatarUrl:   string;
  location:    string;
  website:     string;
  skills:      string[];
  socialLinks: SocialLink[];
  isPublic:    boolean;
  createdAt:   string;
  updatedAt:   string;
}

// ─── Profile (public view) ────────────────────────────────────────────────────

export interface Profile {
  id:          string;
  userId:      string;
  username:    string;
  displayName: string;
  bio:         string;
  avatarUrl?:  string;
  location?:   string;
  website?:    string;
  skills:      string[];
  socialLinks: SocialLink[];
  isPublic:    boolean;
  createdAt:   string;
  updatedAt:   string;
}

export interface SocialLink {
  id:        string;
  platform:  SocialPlatform;
  url:       string;
  label?:    string;
}

export type SocialPlatform =
  | 'github'
  | 'linkedin'
  | 'twitter'
  | 'youtube'
  | 'instagram'
  | 'facebook'
  | 'website'
  | 'other';

// ─── Developer Links  (/users/{uid}/links/{linkId}) ───────────────────────────

export interface DevLink {
  id:           string;
  userId:       string;
  title:        string;
  url:          string;
  description?: string;
  category:     LinkCategory;
  icon?:        string;
  pinned:       boolean;
  clicks:       number;
  createdAt:    string;
  updatedAt:    string;
}

export type LinkCategory =
  | 'project'
  | 'repository'
  | 'blog'
  | 'portfolio'
  | 'resume'
  | 'social'
  | 'tool'
  | 'other';

// ─── Statistics ────────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalLinks:        number;
  totalClicks:       number;
  profileViews:      number;
  profileCompletion: number;
}

// ─── Theme ─────────────────────────────────────────────────────────────────────

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextValue {
  theme:         Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme:      (theme: Theme) => void;
}

// ─── Navigation ────────────────────────────────────────────────────────────────

export interface NavItem {
  label:     string;
  href:      string;
  icon?:     string;
  badge?:    string | number;
  children?: NavItem[];
}

// ─── Form schemas (shared base types) ─────────────────────────────────────────

export interface LoginFormData {
  email:      string;
  password:   string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  fullName:        string;
  email:           string;
  password:        string;
  confirmPassword: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ProfileFormData {
  displayName: string;
  username:    string;
  bio:         string;
  location?:   string;
  website?:    string;
  skills:      string[];
}

export interface LinkFormData {
  title:        string;
  url:          string;
  description?: string;
  category:     LinkCategory;
  pinned?:      boolean;
}

// ─── Component prop helpers ────────────────────────────────────────────────────

export interface WithClassName {
  className?: string;
}

export type Size    = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'warning';
export type Status  = 'idle' | 'loading' | 'success' | 'error';
