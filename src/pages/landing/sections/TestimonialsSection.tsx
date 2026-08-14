import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { MOCK_TESTIMONIALS } from '../../../lib/mock-data';
import { Avatar } from '../../../components/ui/Avatar';

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-surface-900">
      <div className="page-container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-3"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-surface-50 tracking-tight"
          >
            Loved by developers
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card p-6 flex flex-col gap-4"
            >
              <Quote className="h-6 w-6 text-brand-300 dark:text-brand-600 shrink-0" />
              <p className="text-sm text-surface-600 dark:text-surface-300 leading-relaxed flex-1">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-surface-100 dark:border-surface-700">
                <Avatar name={t.name} src={t.avatar} size="sm" rounded="full" />
                <div>
                  <p className="text-sm font-semibold text-surface-800 dark:text-surface-200">{t.name}</p>
                  <p className="text-xs text-surface-400">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
