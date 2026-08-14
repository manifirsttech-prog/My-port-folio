import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { linkSchema, type LinkSchema } from '../../../lib/validations';
import { useLinks } from '../../../contexts/LinksContext';
import { useToast } from '../../../contexts/ToastContext';
import { Modal } from '../../../components/modals/Modal';
import { Button } from '../../../components/buttons/Button';
import { TextInput } from '../../../components/inputs/TextInput';
import { Textarea } from '../../../components/inputs/Textarea';
import { LINK_CATEGORIES } from '../../../constants';
import type { DevLink } from '../../../types';

interface LinkFormModalProps {
  open: boolean;
  onClose: () => void;
  editLink?: DevLink | null;
}

export function LinkFormModal({ open, onClose, editLink }: LinkFormModalProps) {
  const { addLink, updateLink } = useLinks();
  const { success } = useToast();
  const isEditing = !!editLink;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<LinkSchema>({
    resolver: zodResolver(linkSchema) as never,
    defaultValues: { category: 'project', pinned: false },
  });

  // Populate form when editing
  useEffect(() => {
    if (editLink) {
      reset({
        title:       editLink.title,
        url:         editLink.url,
        description: editLink.description ?? '',
        category:    editLink.category,
        pinned:      editLink.pinned,
      });
    } else {
      reset({ title: '', url: '', description: '', category: 'project', pinned: false });
    }
  }, [editLink, reset, open]);

  const onSubmit: SubmitHandler<LinkSchema> = async (data) => {
    try {
      if (isEditing && editLink) {
        await updateLink(editLink.id, data);
        success('Link updated', `"${data.title}" has been saved.`);
      } else {
        await addLink(data);
        success('Link added', `"${data.title}" is now in your profile.`);
      }
      onClose();
    } catch (err) {
      // error toast is handled by the parent page; re-throw so isSubmitting resets
      throw err;
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? 'Edit Link' : 'Add New Link'}
      description={isEditing ? 'Update the details for this link.' : 'Add a new link to your developer profile.'}
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <TextInput
          label="Title"
          placeholder="My Portfolio"
          error={errors.title?.message}
          {...register('title')}
        />
        <TextInput
          label="URL"
          type="url"
          placeholder="https://example.com"
          error={errors.url?.message}
          {...register('url')}
        />
        <Textarea
          label="Description"
          placeholder="A short description of this link (optional)"
          rows={2}
          maxLength={300}
          showCount
          error={errors.description?.message}
          {...register('description')}
        />

        {/* Category */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Category</label>
          <select
            className="input-base"
            {...register('category')}
          >
            {LINK_CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
        </div>

        {/* Pinned */}
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input type="checkbox" className="h-4 w-4 rounded border-surface-300 text-brand-600 focus:ring-brand-500" {...register('pinned')} />
          <span className="text-sm text-surface-700 dark:text-surface-300">Pin to top of profile</span>
        </label>

        <div className="flex items-center gap-3 pt-2">
          <Button type="button" variant="secondary" fullWidth onClick={onClose}>Cancel</Button>
          <Button type="submit" fullWidth loading={isSubmitting}>
            {isEditing ? 'Save Changes' : 'Add Link'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
