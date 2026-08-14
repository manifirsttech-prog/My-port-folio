import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export function WelcomeCard() {
  const { user } = useAuth();
  const firstName = user?.fullName?.split(' ')[0] ?? 'there';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 p-6 text-white shadow-card-lg"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 h-32 w-32 rounded-full bg-white/5 translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 text-brand-200" />
            <span className="text-sm text-brand-200 font-medium">{getGreeting()}</span>
          </div>
          <h2 className="text-2xl font-bold">{firstName} 👋</h2>
          <p className="mt-1.5 text-brand-200 text-sm max-w-xs">
            Your profile is looking great. Keep adding links to grow your developer presence.
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-4 flex flex-wrap gap-2">
        <Link
          to="/dashboard/links"
          className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-4 py-2 text-sm font-medium hover:bg-white/25 transition-colors"
        >
          Add a link <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          to="/dashboard/profile"
          className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20 transition-colors"
        >
          Edit profile
        </Link>
      </div>
    </motion.div>
  );
}
