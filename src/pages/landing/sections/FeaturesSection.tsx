import { motion } from 'framer-motion';
import { Link2, LayoutDashboard, Globe, Palette, BarChart2, Shield } from 'lucide-react';

const FEATURES = [
  {
    icon: Link2,
    title: 'All Links in One Place',
    description: 'Collect every important developer link — GitHub, portfolio, blog, resume — into one beautiful profile.',
    color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400',
  },
  {
    icon: LayoutDashboard,
    title: 'Powerful Dashboard',
    description: 'Manage your links, track clicks, and monitor profile views from a clean, intuitive dashboard.',
    color: 'bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400',
  },
  {
    icon: Globe,
    title: 'Public Profile Page',
    description: 'Share a single URL with recruiters, collaborators, and the community. First impressions matter.',
    color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
  },
  {
    icon: Palette,
    title: 'Beautiful by Default',
    description: 'Light and dark mode, clean typography, and a polished design that makes your profile stand out.',
    color: 'bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400',
  },
  {
    icon: BarChart2,
    title: 'Analytics & Insights',
    description: 'See how many people click your links and view your profile. Understand what resonates.',
    color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400',
  },
  {
    icon: Shield,
    title: 'Privacy Controls',
    description: 'You decide what\'s visible on your public profile. Full control over your developer brand.',
    color: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-surface-900">
      <div className="page-container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-3"
          >
            Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-surface-50 tracking-tight"
          >
            Everything a developer needs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-surface-500 dark:text-surface-400"
          >
            DevLink is built specifically for developers — no bloat, just the tools you actually need.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -3 }}
              className="card p-6 group"
            >
              <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl mb-4 ${f.color}`}>
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-surface-900 dark:text-surface-50 mb-2">{f.title}</h3>
              <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
