import { useState, useRef, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, X, Plus } from 'lucide-react';
import { profileSchema, type ProfileSchema } from '../../../lib/validations';
import { useProfile } from '../../../contexts/ProfileContext';
import { useToast } from '../../../contexts/ToastContext';
import { Button } from '../../../components/buttons/Button';
import { TextInput } from '../../../components/inputs/TextInput';
import { Textarea } from '../../../components/inputs/Textarea';
import { Avatar } from '../../../components/ui/Avatar';
import { Spinner } from '../../../components/loaders/Spinner';
import { SKILL_SUGGESTIONS } from '../../../constants';

export function EditProfilePage() {
  const { profile, isLoading, saveProfile, uploadAvatar } = useProfile();
  const { success, error } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const [skills,       setSkills]       = useState<string[]>([]);
  const [skillInput,   setSkillInput]   = useState('');
  const [saving,       setSaving]       = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);
  const [pendingFile,  setPendingFile]  = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema) as never,
  });

  // Populate form once profile loads from Firestore
  useEffect(() => {
    if (profile) {
      reset({
        displayName: profile.displayName,
        username:    profile.username,
        bio:         profile.bio,
        location:    profile.location,
        website:     profile.website,
      });
      setSkills(profile.skills);
      setAvatarPreview(profile.avatarUrl || undefined);
    }
  }, [profile, reset]);

  // Cleanup: revoke object URL on unmount to prevent memory leak
  useEffect(() => {
    return () => {
      if (avatarPreview && avatarPreview.startsWith('blob:')) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const addSkill = (skill: string) => {
    const s = skill.trim();
    if (s && !skills.includes(s)) {
      setSkills(prev => [...prev, s]);
    }
    setSkillInput('');
  };

  const removeSkill = (skill: string) =>
    setSkills(prev => prev.filter(s => s !== skill));

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Revoke previous object URL to prevent memory leak
    if (avatarPreview && avatarPreview.startsWith('blob:')) {
      URL.revokeObjectURL(avatarPreview);
    }
    
    setPendingFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const onSubmit: SubmitHandler<ProfileSchema> = async (data) => {
    setSaving(true);
    try {
      // Upload avatar first if a new file was selected
      if (pendingFile) {
        await uploadAvatar(pendingFile);
        setPendingFile(null);
      }
      await saveProfile(data, skills);
      success('Profile saved', 'Your profile has been updated.');
    } catch (err) {
      error('Save failed', (err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">Edit Profile</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
            Update your public profile information.
          </p>
        </div>
        <Button type="submit" loading={saving}>Save Changes</Button>
      </div>

      {/* Avatar */}
      <div className="card p-6">
        <h2 className="text-sm font-semibold text-surface-800 dark:text-surface-200 mb-4">
          Profile Picture
        </h2>
        <div className="flex items-center gap-5">
          <div className="relative">
            <Avatar
              name={profile?.displayName ?? 'User'}
              src={avatarPreview}
              size="xl"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white shadow-md hover:bg-brand-700 transition-colors"
              aria-label="Change profile picture"
            >
              <Camera className="h-4 w-4" />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleAvatarChange}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-surface-800 dark:text-surface-200">
              Upload a photo
            </p>
            <p className="text-xs text-surface-400 mt-0.5">JPG, PNG or GIF. Max 2 MB.</p>
            {pendingFile && (
              <p className="text-xs text-brand-600 dark:text-brand-400 mt-1">
                New photo selected — will upload on save.
              </p>
            )}
            <Button
              type="button"
              variant="secondary"
              size="xs"
              className="mt-2"
              onClick={() => fileRef.current?.click()}
            >
              Choose file
            </Button>
          </div>
        </div>
      </div>

      {/* Basic info */}
      <div className="card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-surface-800 dark:text-surface-200 mb-1">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            label="Display Name"
            placeholder="Alex Johnson"
            required
            error={errors.displayName?.message}
            disabled={saving}
            {...register('displayName')}
          />
          <TextInput
            label="Username"
            placeholder="alexjohnson"
            hint="devlink.io/alexjohnson"
            required
            error={errors.username?.message}
            disabled={saving}
            {...register('username')}
          />
        </div>
        <Textarea
          label="Bio"
          placeholder="Tell the world about yourself…"
          rows={3}
          maxLength={300}
          showCount
          error={errors.bio?.message}
          disabled={saving}
          {...register('bio')}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            label="Location"
            placeholder="San Francisco, CA"
            error={errors.location?.message}
            disabled={saving}
            {...register('location')}
          />
          <TextInput
            label="Website"
            type="url"
            placeholder="https://yoursite.com"
            error={errors.website?.message}
            disabled={saving}
            {...register('website')}
          />
        </div>
      </div>

      {/* Skills */}
      <div className="card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-surface-800 dark:text-surface-200">Skills</h2>

        {/* Current skills */}
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <span
              key={skill}
              className="badge bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300 gap-1 pr-1"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-0.5 hover:text-red-500 transition-colors rounded-full"
                aria-label={`Remove ${skill}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          {skills.length === 0 && (
            <p className="text-sm text-surface-400">No skills added yet.</p>
          )}
        </div>

        {/* Add skill input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addSkill(skillInput);
              }
            }}
            placeholder="Add a skill…"
            className="input-base flex-1"
            list="skill-suggestions"
            disabled={saving}
          />
          <datalist id="skill-suggestions">
            {SKILL_SUGGESTIONS.filter(s => !skills.includes(s)).map(s => (
              <option key={s} value={s} />
            ))}
          </datalist>
          <Button
            type="button"
            variant="secondary"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => addSkill(skillInput)}
            disabled={!skillInput.trim() || saving}
          >
            Add
          </Button>
        </div>

        {/* Quick-add suggestions */}
        <div className="flex flex-wrap gap-1.5">
          {SKILL_SUGGESTIONS
            .filter(s => !skills.includes(s))
            // .slice(0, 8)
            .map(s => (
              <button
                key={s}
                type="button"
                onClick={() => addSkill(s)}
                disabled={saving}
                className="badge bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-300 hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-950/50 dark:hover:text-brand-300 transition-colors cursor-pointer"
              >
                + {s}
              </button>
            ))}
        </div>
      </div>

      {/* Save bottom */}
      <div className="flex justify-end">
        <Button type="submit" size="lg" loading={saving}>
          Save Changes
        </Button>
      </div>
    </form>
  );
}
