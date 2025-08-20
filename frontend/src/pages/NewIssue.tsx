import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../lib/api';

const IssueSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().max(500, 'Description must be ≤ 500 characters').optional(),
});
type IssueInput = z.infer<typeof IssueSchema>;

export default function NewIssue() {
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<IssueInput>({ resolver: zodResolver(IssueSchema) });

  const onSubmit = async (data: IssueInput) => {
    await api.createIssue({ title: data.title.trim(), description: data.description?.trim() || undefined });
    nav('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gap: 8, maxWidth: 520 }}>
      <h2>New Issue</h2>

      <input placeholder="Title" {...register('title')} />
      {errors.title && <p style={{ color: 'crimson' }}>{errors.title.message}</p>}

      <textarea placeholder="Description" rows={5} {...register('description')} />
      {errors.description && <p style={{ color: 'crimson' }}>{errors.description.message}</p>}

      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit" disabled={isSubmitting}>Create</button>
        <button type="button" onClick={() => nav('/')}>Cancel</button>
      </div>
    </form>
  );
}
