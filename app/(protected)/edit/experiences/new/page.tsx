import ExperienceForm from '../_components/experience-form';

export default function NewExperiencePage() {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-6'>Add New Experience</h2>
      <div className='p-6 bg-surface border border-border rounded-lg'>
        <ExperienceForm />
      </div>
    </div>
  );
}
