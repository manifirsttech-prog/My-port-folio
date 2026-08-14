import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ArrowRight, Link2 } from 'lucide-react';
import { useLinks } from '../../../contexts/LinksContext';
import { LinkCard } from '../../../components/cards/LinkCard';
import { EmptyState } from '../../../components/feedback/EmptyState';
import { SkeletonLinkCard } from '../../../components/loaders/SkeletonCard';

export function RecentLinks() {
  const { links, isLoading } = useLinks();
  const recent = links.slice(0, 4);

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-surface-800 dark:text-surface-200">Recent Links</h3>
        <Link
          to="/dashboard/links"
          className="inline-flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium"
        >
          View all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => <SkeletonLinkCard key={i} />)}
        </div>
      ) : recent.length === 0 ? (
        <EmptyState
          icon={<Link2 className="h-8 w-8" />}
          title="No links yet"
          description="Add your first developer link to get started."
        />
      ) : (
        <div className="space-y-2">
          <AnimatePresence>
            {recent.map(link => (
              <LinkCard key={link.id} link={link} readOnly />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
