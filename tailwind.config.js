/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        surface: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glow':    '0 0 20px rgba(59,130,246,0.15)',
        'glow-lg': '0 0 40px rgba(59,130,246,0.20)',
        'card':    '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-md': '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.05)',
        'card-lg': '0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.05)',
      },
      animation: {
        'fade-in':    'fadeIn 0.3s ease-out',
        'slide-up':   'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:   { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { '0%': { opacity: '0', transform: 'translateY(-16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      backgroundImage: {
        'gradient-radial':    'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh':      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'hero-gradient':      'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #0ea5e9 100%)',
        'card-gradient-dark': 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.9) 100%)',
      },
    },
  },
  plugins: [],
}
