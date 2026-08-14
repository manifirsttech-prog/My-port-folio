import type { User, Profile, DevLink, DashboardStats } from '../types';

// ─── Mock User ─────────────────────────────────────────────────────────────────
export const MOCK_USER: User = {
  uid: 'user_01',
  email: 'alex.johnson@example.com',
  fullName: 'Alex Johnson',
  username: 'alexjohnson',
  avatarUrl: 'https://api.dicebear.com/8.x/avataaars/svg?seed=alexjohnson',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-06-20T14:30:00Z',
};

// ─── Mock Profile ──────────────────────────────────────────────────────────────
export const MOCK_PROFILE: Profile = {
  id: 'profile_01',
  userId: 'user_01',
  username: 'alexjohnson',
  displayName: 'Alex Johnson',
  bio: 'Full-stack developer passionate about building great developer tools and open-source software. I love TypeScript, React, and everything in between.',
  avatarUrl: 'https://api.dicebear.com/8.x/avataaars/svg?seed=alexjohnson',
  location: 'San Francisco, CA',
  website: 'https://alexjohnson.dev',
  skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL', 'Tailwind CSS'],
  socialLinks: [
    { id: 'sl_1', platform: 'github',   url: 'https://github.com/alexjohnson' },
    { id: 'sl_2', platform: 'linkedin', url: 'https://linkedin.com/in/alexjohnson' },
    { id: 'sl_3', platform: 'twitter',  url: 'https://twitter.com/alexjohnson' },
  ],
  isPublic: true,
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-06-20T14:30:00Z',
};

// ─── Mock Links ────────────────────────────────────────────────────────────────
export const MOCK_LINKS: DevLink[] = [
  {
    id: 'link_01',
    userId: 'user_01',
    title: 'DevLink — Portfolio Manager',
    url: 'https://github.com/alexjohnson/devlink',
    description: 'Open-source developer portfolio manager built with React and TypeScript.',
    category: 'repository',
    pinned: true,
    clicks: 248,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-06-10T09:00:00Z',
  },
  {
    id: 'link_02',
    userId: 'user_01',
    title: 'Personal Portfolio',
    url: 'https://alexjohnson.dev',
    description: 'My personal portfolio showcasing projects and experience.',
    category: 'portfolio',
    pinned: true,
    clicks: 512,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-06-15T11:00:00Z',
  },
  {
    id: 'link_03',
    userId: 'user_01',
    title: 'Building Scalable React Apps',
    url: 'https://medium.com/@alexjohnson/building-scalable-react-apps',
    description: 'A deep dive into patterns for building large-scale React applications.',
    category: 'blog',
    pinned: false,
    clicks: 1043,
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-03-10T10:00:00Z',
  },
  {
    id: 'link_04',
    userId: 'user_01',
    title: 'Resume / CV',
    url: 'https://alexjohnson.dev/resume.pdf',
    description: 'Latest resume — updated June 2024.',
    category: 'resume',
    pinned: false,
    clicks: 189,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-06-01T08:00:00Z',
  },
  {
    id: 'link_05',
    userId: 'user_01',
    title: 'TaskFlow — Project Management Tool',
    url: 'https://taskflow.app',
    description: 'A lightweight project management app for small teams.',
    category: 'project',
    pinned: false,
    clicks: 376,
    createdAt: '2024-04-05T10:00:00Z',
    updatedAt: '2024-05-20T14:00:00Z',
  },
  {
    id: 'link_06',
    userId: 'user_01',
    title: 'TypeScript Utilities',
    url: 'https://github.com/alexjohnson/ts-utils',
    description: 'A collection of handy TypeScript utility functions and types.',
    category: 'repository',
    pinned: false,
    clicks: 94,
    createdAt: '2024-05-01T10:00:00Z',
    updatedAt: '2024-05-01T10:00:00Z',
  },
];

// ─── Mock Stats ────────────────────────────────────────────────────────────────
export const MOCK_STATS: DashboardStats = {
  totalLinks:        MOCK_LINKS.length,
  totalClicks:       MOCK_LINKS.reduce((acc, l) => acc + l.clicks, 0),
  profileViews:      3812,
  profileCompletion: 82,
};

// ─── Mock Testimonials ─────────────────────────────────────────────────────────
export const MOCK_TESTIMONIALS = [
  {
    id: 't1',
    name: 'Sarah Chen',
    role: 'Senior Frontend Engineer',
    company: 'Stripe',
    avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=sarah',
    text: 'DevLink completely transformed how I share my work. I used to maintain five separate links — now it\'s just one.',
  },
  {
    id: 't2',
    name: 'Marcus Rivera',
    role: 'Full-Stack Developer',
    company: 'Vercel',
    avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=marcus',
    text: 'The dashboard is beautiful and the public profile looks incredibly professional. My recruiters love it.',
  },
  {
    id: 't3',
    name: 'Priya Patel',
    role: 'Software Architect',
    company: 'Shopify',
    avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=priya',
    text: 'Clean, fast, and exactly what developers need. I\'ve recommended DevLink to my entire team.',
  },
];
