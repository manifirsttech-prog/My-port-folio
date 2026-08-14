import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, Link2, Filter } from 'lucide-react';
import { useLinks } from '../../../contexts/LinksContext';
import { useToast } from '../../../contexts/ToastContext';
import { Button } from '../../../components/buttons/Button';
import { SearchInput } from '../../../components/inputs/SearchInput';
import { LinkCard } from '../../../components/cards/LinkCard';
import { EmptyState } from '../../../components/feedback/EmptyState';
import { DeleteModal } from '../../../components/modals/DeleteModal';
import { LinkFormModal } from '../components/LinkFormModal';
import { SkeletonLinkCard } from '../../../components/loaders/SkeletonCard';
import { LINK_CATEGORIES } from '../../../constants';
import type { DevLink, LinkCategory } from '../../../types';

export function MyLinksPage() {
  const { links, isLoading, deleteLink } = useLinks();
  const { success, error } = useToast();

  const [search,       setSearch]       = useState('');
  const [category,     setCategory]     = useState<LinkCategory | 'all'>('all');
  const [formOpen,     setFormOpen]     = useState(false);
  const [editTarget,   setEditTarget]   = useState<DevLink | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DevLink | null>(null);
  const [deleting,     setDeleting]     = useState(false);

  const filtered = links
    .filter(l => category === 'all' || l.category === category)
    .filter(l =>
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.url.toLowerCase().includes(search.toLowerCase())
    );

  const handleEdit = (link: DevLink) => {
    setEditTarget(link);
    setFormOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteLink(deleteTarget.id);
      success('Link deleted', `"${deleteTarget.title}" has been removed.`);
    } catch (err) {
      error('Delete failed', (err as Error).message);
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const openAdd = () => {
    setEditTarget(null);
    setFormOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">My Links</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
            {isLoading ? '…' : `${links.length} link${links.length !== 1 ? 's' : ''} in your profile`}
          </p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />} onClick={openAdd}>
          Add Link
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchInput
          placeholder="Search links…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onClear={() => setSearch('')}
          wrapperClassName="flex-1"
        />
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-surface-400 shrink-0" />
          <select
            value={category}
            onChange={e => setCategory(e.target.value as LinkCategory | 'all')}
            className="input-base w-auto"
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            {LINK_CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Link list */}
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonLinkCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={<Link2 className="h-8 w-8" />}
            title={search || category !== 'all' ? 'No matching links' : 'No links yet'}
            description={
              search || category !== 'all'
                ? 'Try adjusting your search or filter.'
                : 'Add your first link to start building your developer profile.'
            }
            action={
              !search && category === 'all'
                ? { label: 'Add your first link', onClick: openAdd }
                : undefined
            }
          />
        </div>
      ) : (
        <div className="space-y-2">
          <AnimatePresence>
            {filtered.map(link => (
              <LinkCard
                key={link.id}
                link={link}
                onEdit={handleEdit}
                onDelete={l => setDeleteTarget(l)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Modals */}
      <LinkFormModal
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditTarget(null); }}
        editLink={editTarget}
      />
      <DeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete link"
        description={`"${deleteTarget?.title}" will be permanently removed from your profile.`}
      />
    </div>
  );
}
