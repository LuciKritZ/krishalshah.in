'use client';

import { Pencil, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ExperienceType } from '@/types/experience';

export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExperiences = async () => {
    try {
      const res = await fetch('/api/experiences');
      const data = await res.json();
      setExperiences(data);
    } catch (error) {
      console.error('Failed to fetch experiences', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const res = await fetch(`/api/experiences/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setExperiences(experiences.filter(exp => exp._id !== id));
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to delete');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold'>Experiences</h2>
        <Link
          className='flex items-center gap-2 bg-brand text-white px-4 py-2 rounded-md hover:bg-brand/90 transition'
          href='/edit/experiences/new'
        >
          <Plus size={18} /> Add New
        </Link>
      </div>

      <div className='bg-surface border border-border rounded-lg overflow-hidden'>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr className='border-b border-border bg-background'>
              <th className='p-4 font-semibold text-content-secondary'>
                Company
              </th>
              <th className='p-4 font-semibold text-content-secondary'>
                Title
              </th>
              <th className='p-4 font-semibold text-content-secondary'>
                Dates
              </th>
              <th className='p-4 font-semibold text-content-secondary text-right'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {experiences.length === 0 ? (
              <tr>
                <td
                  className='p-8 text-center text-content-tertiary'
                  colSpan={4}
                >
                  No experiences found.
                </td>
              </tr>
            ) : (
              experiences.map(exp => (
                <tr
                  className='border-b border-border last:border-0 hover:bg-background/50 transition'
                  key={exp._id}
                >
                  <td className='p-4'>
                    <div className='font-medium'>{exp.companyName}</div>
                    <div className='text-xs text-content-tertiary'>
                      {exp.isRemote ? 'Remote' : 'On-site'}
                    </div>
                  </td>
                  <td className='p-4'>{exp.jobTitle}</td>
                  <td className='p-4 text-sm'>
                    {new Date(exp.startDate).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })}{' '}
                    -
                    {exp.isCurrent
                      ? ' Present'
                      : exp.endDate
                        ? new Date(exp.endDate).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric',
                          })
                        : ''}
                  </td>
                  <td className='p-4 flex justify-end gap-3'>
                    <Link
                      className='p-2 text-content-secondary hover:text-brand transition bg-background rounded-md border border-border'
                      href={`/edit/experiences/${exp._id}`}
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      className='p-2 text-red-500 hover:text-red-400 transition bg-background rounded-md border border-border'
                      onClick={() => handleDelete(exp._id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
