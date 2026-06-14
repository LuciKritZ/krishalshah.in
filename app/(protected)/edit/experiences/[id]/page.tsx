import { notFound } from 'next/navigation';

import { dbConnection } from '@/database/db-connection';
import Experience from '@/database/models/experience';

import ExperienceForm from '../_components/experience-form';

interface EditExperiencePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditExperiencePage({
  params,
}: EditExperiencePageProps) {
  const { id } = await params;

  await dbConnection();
  let experience = null;

  try {
    const data = await Experience.findById(id).lean();
    if (data) {
      // Convert ObjectIds and Dates to strings/primitives to pass to client component
      experience = JSON.parse(JSON.stringify(data));
    }
  } catch {
    // Handle invalid ObjectId format
  }

  if (!experience) {
    notFound();
  }

  return (
    <div>
      <h2 className='text-2xl font-bold mb-6'>Edit Experience</h2>
      <div className='p-6 bg-surface border border-border rounded-lg'>
        <ExperienceForm initialData={experience} />
      </div>
    </div>
  );
}
