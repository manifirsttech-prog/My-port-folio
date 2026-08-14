import { Link2, MousePointerClick, Eye, TrendingUp } from 'lucide-react';
import { StatCard } from '../../../components/cards/StatCard';
import { SkeletonStatCard } from '../../../components/loaders/SkeletonCard';
import { useLinks } from '../../../contexts/LinksContext';
import { useProfile } from '../../../contexts/ProfileContext';

export function DashboardStatsGrid() {
  const { links, isLoading: linksLoading } = useLinks();
  const { profile, isLoading: profileLoading } = useProfile();
  const loading = linksLoading || profileLoading;

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonStatCard key={i} />)}
      </div>
    );
  }

  const totalClicks = links.reduce((acc, l) => acc + (l.clicks ?? 0), 0);

  // Profile completion score based on filled fields
  const fields = [
    profile?.displayName,
    profile?.bio,
    profile?.avatarUrl,
    profile?.location,
    profile?.website,
    (profile?.skills?.length ?? 0) > 0 ? 'yes' : '',
  ];
  const filled = fields.filter(Boolean).length;
  const completion = Math.round((filled / fields.length) * 100);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Total Links"
        value={links.length}
        icon={<Link2 className="h-5 w-5" />}
        accent="blue"
      />
      <StatCard
        label="Total Clicks"
        value={totalClicks}
        icon={<MousePointerClick className="h-5 w-5" />}
        accent="purple"
      />
      <StatCard
        label="Profile Views"
        value={0}
        icon={<Eye className="h-5 w-5" />}
        accent="green"
      />
      <StatCard
        label="Completion"
        value={`${completion}%`}
        icon={<TrendingUp className="h-5 w-5" />}
        accent="amber"
      />
    </div>
  );
}
