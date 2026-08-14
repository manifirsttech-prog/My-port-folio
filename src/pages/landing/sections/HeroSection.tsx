import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { Button } from '../../../components/buttons/Button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-surface-900 dark:from-surface-950 dark:via-brand-950 dark:to-surface-950" />
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }}
      />
      {/* Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative page-container py-24 pt-40">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 border border-brand-500/20 px-4 py-1.5 mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-400" />
            <span className="text-xs font-medium text-brand-300">The developer profile platform</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight"
          >
            One link for{' '}
            <span className="bg-gradient-to-r from-brand-400 to-cyan-400 bg-clip-text text-transparent">
              all your work
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-lg text-surface-300 max-w-2xl mx-auto leading-relaxed"
          >
            DevLink lets developers create a beautiful public profile and manage all their important links —
            GitHub repos, portfolios, blogs, resumes — in one professional place.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link to="/register">
              <Button size="xl" rightIcon={<ArrowRight className="h-5 w-5" />}>
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button size="xl" variant="ghost" className="text-white border border-white/20 hover:bg-white/10">
                Log In
              </Button>
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex items-center justify-center gap-6 text-surface-400 text-sm"
          >
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1">4.9/5 from developers</span>
            </div>
            <span className="hidden sm:block text-surface-600">•</span>
            <span className="hidden sm:block">No credit card required</span>
          </motion.div>

          {/* Hero mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 relative"
          >
            <div className="mx-auto max-w-3xl rounded-2xl bg-surface-800/60 border border-white/10 backdrop-blur-sm shadow-2xl overflow-hidden">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-surface-900/80 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex-1 mx-3 h-6 rounded-lg bg-surface-700/60 flex items-center px-3">
                  <span className="text-xs text-surface-400">devlink.io/alexjohnson</span>
                </div>
              </div>
              {/* Mock dashboard preview */}
              <div className="p-6 grid grid-cols-3 gap-4 min-h-[180px]">
                {[
                  { label: 'Total Links', val: '12', color: 'bg-brand-500/20 text-brand-400' },
                  { label: 'Total Clicks', val: '2.4k', color: 'bg-emerald-500/20 text-emerald-400' },
                  { label: 'Profile Views', val: '3.8k', color: 'bg-violet-500/20 text-violet-400' },
                ].map(s => (
                  <div key={s.label} className="rounded-xl bg-surface-700/40 p-4 flex flex-col gap-1">
                    <div className={`text-lg font-bold ${s.color}`}>{s.val}</div>
                    <div className="text-xs text-surface-400">{s.label}</div>
                  </div>
                ))}
                <div className="col-span-3 space-y-2">
                  {['Personal Portfolio', 'GitHub Profile', 'Tech Blog'].map(t => (
                    <div key={t} className="flex items-center gap-3 rounded-xl bg-surface-700/30 p-3">
                      <div className="h-7 w-7 rounded-lg bg-brand-500/20 shrink-0" />
                      <div className="flex-1 h-2.5 rounded bg-surface-600/60" />
                      <div className="h-6 w-14 rounded-lg bg-surface-600/40 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
