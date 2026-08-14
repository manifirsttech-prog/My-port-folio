import { Trash2 } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from '../buttons/Button';

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  loading?: boolean;
}

export function DeleteModal({
  open,
  onClose,
  onConfirm,
  title       = 'Delete item',
  description = 'This action cannot be undone. Are you sure you want to delete this item?',
  loading     = false,
}: DeleteModalProps) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center gap-4 pb-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-950/30 dark:text-red-400">
          <Trash2 className="h-7 w-7" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-surface-900 dark:text-surface-50">{title}</h2>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">{description}</p>
        </div>
        <div className="flex w-full items-center gap-3">
          <Button variant="secondary" fullWidth onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" fullWidth onClick={onConfirm} loading={loading}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
