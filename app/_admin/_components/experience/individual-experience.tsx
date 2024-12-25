import React from 'react';

import { Badge, CalendarDays, MapPinHouse } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getStartAndEndDate } from '@/lib/date';
import { ExperienceSchema } from '@/types/global-types';

interface EditableIndividualExperienceProps {
  experience: ExperienceSchema;
  onContentChange: (
    key: keyof ExperienceSchema,
    value: string
  ) => Promise<void> | void;
}

export const IndividualExperience = ({
  companyLink,
  companyName,
  description,
  startDate,
  endDate,
  isCurrent,
  isRemote,
  jobTitle,
}: ExperienceSchema) => {
  return (
    <Card className='rounded-lg border-[1px]'>
      <CardHeader>
        <div className='flex md:flex-row flex-col justify-between md:space-x-2 space-x-0'>
          {/* Company Name */}
          <Link
            href={companyLink}
            className='p-0 text-base text-muted-foreground font-bold text-pretty text-start flex-1 justify-start underline'
          >
            {jobTitle}, {companyName}
          </Link>

          {/* Duration */}
          <div className='flex items-center text-destructive text-base'>
            <CalendarDays className='mr-2 h-4 w-4 opacity-70' />{' '}
            <span>{getStartAndEndDate(isCurrent, startDate, endDate)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className='relative pb-6 flex flex-col space-y-4'>
        <div
          className='text-slate-500'
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div>
          {isRemote ? (
            <Badge className='text-sm'>
              <MapPinHouse className='mr-1 size-4' />
              Remote
            </Badge>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default IndividualExperience;
