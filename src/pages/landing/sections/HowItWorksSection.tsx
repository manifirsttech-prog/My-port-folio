import { motion } from 'framer-motion';
import { UserPlus, Link2, Share2 } from 'lucide-react';

const STEPS = [
  { step: '01', icon: UserPlus,  title: 'Create your account', description: 'Sign up in seconds. No credit card required.' },
  { step: '02', icon: Link2,     title: 'Add your links',       description: 'Paste in your GitHub, portfolio, blog, resume, and more.' },
  { step: '03', icon: Share2,    title: 'Share your profile',   description: 'Get your unique devlink.io URL and share it everywhere.' },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-surface-50 dark:bg-surface-950">
      <div className="page-container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-3"
          >
            How it Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-surface-50 tracking-tight"
          >
            Up and running in 3 steps
          </motion.h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent dark:via-brand-700 z-0" />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-surface-800 border-2 border-brand-200 dark:border-brand-800 shadow-card mb-4">
                <s.icon className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <span className="text-xs font-bold text-brand-500 dark:text-brand-400 mb-1">{s.step}</span>
              <h3 className="font-semibold text-surface-900 dark:text-surface-50 mb-2">{s.title}</h3>
              <p className="text-sm text-surface-500 dark:text-surface-400">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
