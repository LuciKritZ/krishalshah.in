'use client';

import { sanitize } from 'isomorphic-dompurify';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ExperienceType } from '@/types/experience';

import RichTextEditor from './rich-text-editor';

export default function ExperienceForm({
  initialData,
}: {
  initialData?: null | Partial<ExperienceType>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    companyImage: initialData?.companyImage || '',
    companyLink: initialData?.companyLink || '',
    companyName: initialData?.companyName || '',
    companyShortName: initialData?.companyShortName || '',
    description: initialData?.description || '',
    endDate: initialData?.endDate
      ? new Date(initialData.endDate).toISOString().split('T')[0]
      : '',
    isCurrent: initialData?.isCurrent || false,
    isRemote: initialData?.isRemote || false,
    jobTitle: initialData?.jobTitle || '',
    skills: initialData?.skills?.join(', ') || '',
    startDate: initialData?.startDate
      ? new Date(initialData.startDate).toISOString().split('T')[0]
      : '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        description: sanitize(formData.description),
        endDate: formData.isCurrent ? null : formData.endDate || null,
        skills: formData.skills
          .split(',')
          .map((s: string) => s.trim())
          .filter(Boolean),
      };

      const url = initialData
        ? `/api/experiences/${initialData._id}`
        : '/api/experiences';
      const method = initialData ? 'PUT' : 'POST';

      const res = await fetch(url, {
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
        method,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      router.push('/edit/experiences');
      router.refresh();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
      setLoading(false);
    }
  };

  return (
    <form className='flex flex-col gap-6 max-w-3xl' onSubmit={handleSubmit}>
      {error && (
        <div className='p-3 bg-red-500/10 border border-red-500/50 text-red-500 rounded'>
          {error}
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm mb-1 text-content-secondary'>
            Company Name *
          </label>
          <input
            className='w-full px-3 py-2 bg-background border border-border rounded-md'
            name='companyName'
            onChange={handleChange}
            required
            value={formData.companyName}
          />
        </div>
        <div>
          <label className='block text-sm mb-1 text-content-secondary'>
            Company Short Name *
          </label>
          <input
            className='w-full px-3 py-2 bg-background border border-border rounded-md'
            name='companyShortName'
            onChange={handleChange}
            required
            value={formData.companyShortName}
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm mb-1 text-content-secondary'>
            Company Link
          </label>
          <input
            className='w-full px-3 py-2 bg-background border border-border rounded-md'
            name='companyLink'
            onChange={handleChange}
            value={formData.companyLink}
          />
        </div>
        <div>
          <label className='block text-sm mb-1 text-content-secondary'>
            Company Image URL
          </label>
          <input
            className='w-full px-3 py-2 bg-background border border-border rounded-md'
            name='companyImage'
            onChange={handleChange}
            value={formData.companyImage}
          />
        </div>
      </div>

      <div>
        <label className='block text-sm mb-1 text-content-secondary'>
          Job Title *
        </label>
        <input
          className='w-full px-3 py-2 bg-background border border-border rounded-md'
          name='jobTitle'
          onChange={handleChange}
          required
          value={formData.jobTitle}
        />
      </div>

      <div>
        <label className='block text-sm mb-1 text-content-secondary'>
          Description *
        </label>
        <RichTextEditor
          content={formData.description}
          onChange={content =>
            setFormData(prev => ({ ...prev, description: content }))
          }
        />
      </div>

      <div>
        <label className='block text-sm mb-1 text-content-secondary'>
          Skills (comma separated)
        </label>
        <input
          className='w-full px-3 py-2 bg-background border border-border rounded-md'
          name='skills'
          onChange={handleChange}
          placeholder='React, Node.js, MongoDB'
          value={formData.skills}
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm mb-1 text-content-secondary'>
            Start Date *
          </label>
          <input
            className='w-full px-3 py-2 bg-background border border-border rounded-md'
            name='startDate'
            onChange={handleChange}
            required
            type='date'
            value={formData.startDate}
          />
        </div>
        <div>
          <label className='block text-sm mb-1 text-content-secondary'>
            End Date
          </label>
          <input
            className='w-full px-3 py-2 bg-background border border-border rounded-md disabled:opacity-50'
            disabled={formData.isCurrent}
            name='endDate'
            onChange={handleChange}
            required={!formData.isCurrent}
            type='date'
            value={formData.endDate}
          />
        </div>
      </div>

      <div className='flex gap-6'>
        <label className='flex items-center gap-2 cursor-pointer'>
          <input
            checked={formData.isCurrent}
            className='w-4 h-4 accent-brand'
            name='isCurrent'
            onChange={handleChange}
            type='checkbox'
          />
          <span>Current Job</span>
        </label>
        <label className='flex items-center gap-2 cursor-pointer'>
          <input
            checked={formData.isRemote}
            className='w-4 h-4 accent-brand'
            name='isRemote'
            onChange={handleChange}
            type='checkbox'
          />
          <span>Remote</span>
        </label>
      </div>

      <div className='flex gap-4'>
        <button
          className='bg-brand text-white px-6 py-2 rounded-md hover:bg-brand/90 transition disabled:opacity-50'
          disabled={loading}
          type='submit'
        >
          {loading ? 'Saving...' : 'Save Experience'}
        </button>
        <button
          className='px-6 py-2 border border-border rounded-md hover:bg-background transition'
          onClick={() => router.push('/edit/experiences')}
          type='button'
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
