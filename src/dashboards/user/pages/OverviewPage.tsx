import { WelcomeCard } from '../components/WelcomeCard';
import { DashboardStatsGrid } from '../components/DashboardStatsGrid';
import { QuickActions } from '../components/QuickActions';
import { RecentLinks } from '../components/RecentLinks';
import { ProfileProgress } from '../components/ProfileProgress';

export function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">Dashboard</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
          Here's an overview of your DevLink profile.
        </p>
      </div>

      {/* Welcome */}
      <WelcomeCard />

      {/* Stats */}
      <DashboardStatsGrid />

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent links — wider */}
        <div className="lg:col-span-2 space-y-6">
          <RecentLinks />
        </div>
        {/* Sidebar widgets */}
        <div className="space-y-6">
          <ProfileProgress />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
