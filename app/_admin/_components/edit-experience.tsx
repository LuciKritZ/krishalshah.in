'use client';

import { useState } from 'react';

import { CirclePlus } from 'lucide-react';

import { IndividualExperience } from '@/app/_about/_sections/experience';
import { siteConfig } from '@/config';
import { ExperienceSchema } from '@/types/global-types';

const EditExperience = () => {
  const [experiences, setExperiences] = useState<ExperienceSchema[]>(
    siteConfig.experience
  );
  const [selectedExperienceId, setSelectedExperienceId] =
    useState<ExperienceSchema['_id']>();

  const onEditExperienceContent = (
    key: keyof ExperienceSchema,
    value: string
  ) => {
    if (!selectedExperienceId) return null;

    setExperiences((prevExperiences) => [
      ...prevExperiences.map((exp, index) => {
        if (exp._id === selectedExperienceId) {
          return {
            ...exp,
            [key]: [value],
          };
        } else {
          return exp;
        }
      }),
    ]);
  };

  onEditExperienceContent('_id', '');

  return (
    <section className='pt-24'>
      <h2 className='title mb-12 flex items-center gap-4'>
        Experience
        <CirclePlus className='size-5 cursor-pointer' />
      </h2>

      <div className='relative flex flex-col justify-center overflow-hidden'>
        <div className='w-full max-w-6xl mx-auto'>
          <div className='flex flex-col justify-center divide-y divide-slate-200'>
            <div className='w-full max-w-3xl mx-auto space-y-8'>
              {siteConfig.experience.map((experience) => (
                <IndividualExperience
                  key={experience._id.toString()}
                  {...experience}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditExperience;
