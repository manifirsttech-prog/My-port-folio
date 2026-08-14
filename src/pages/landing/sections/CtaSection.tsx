import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../../components/buttons/Button';

export function CtaSection() {
  return (
    <section className="py-24 bg-surface-50 dark:bg-surface-950">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 p-12 text-center"
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to build your developer profile?
            </h2>
            <p className="mt-4 text-brand-200 text-lg max-w-xl mx-auto">
              Join thousands of developers who use DevLink to share their work and grow their career.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/register">
                <Button size="xl" variant="secondary" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  Create Free Account
                </Button>
              </Link>
              <Link to="/profile/alexjohnson">
                <Button size="xl" className="bg-white/10 text-white border border-white/20 hover:bg-white/20">
                  See an Example Profile
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
