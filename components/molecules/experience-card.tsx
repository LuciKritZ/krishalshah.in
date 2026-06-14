'use client';

import { sanitize } from 'isomorphic-dompurify';
import { Calendar, ChevronRight, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface ExperienceCardProps {
  companyLink: string;
  companyName: string;
  description: string;
  endDate?: Date | string;
  index: number;
  isCurrent: boolean;
  isRemote: boolean;
  jobTitle: string;
  skills?: string[];
  startDate: Date | string;
}

const ExperienceCard = ({
  companyLink,
  companyName,
  description,
  endDate,
  index,
  isCurrent,
  isRemote,
  jobTitle,
  skills,
  startDate,
}: ExperienceCardProps) => {
  const formatDate = (date: Date | string) => {
    return new Date(date)
      .toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
      .toUpperCase();
  };

  return (
    <motion.div
      className='group relative border-b border-border py-ui-xl first:pt-0 last:border-0 last:pb-0 md:border-0 md:py-0 md:pl-ui-2xl'
      initial={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, x: 0 }}
    >
      <motion.div
        className='absolute top-2 left-[-5.5px] hidden h-3 w-3 rounded-full bg-border transition-all duration-500 md:block'
        variants={{
          active: {
            backgroundColor: 'var(--color-brand)',
            boxShadow: '0 0 10px var(--color-brand)',
          },
          inactive: {
            backgroundColor: 'var(--color-border)',
            boxShadow: 'none',
          },
        }}
        viewport={{ margin: '100% 0px -80% 0px' }}
        whileInView='active'
      />

      <div className='flex flex-col gap-ui-lg'>
        <div className='flex flex-col justify-between gap-ui-md md:flex-row md:items-center'>
          <div>
            <a
              className='inline-block'
              href={companyLink}
              rel='noopener noreferrer'
              target='_blank'
            >
              <h2 className='font-display text-3xl font-bold tracking-tight transition-colors group-hover:text-brand md:text-4xl'>
                {companyName}
              </h2>
            </a>
            <div className='mt-ui-xs flex flex-wrap items-center gap-ui-md'>
              <span className='micro-text text-brand'>{jobTitle}</span>
              <span className='micro-text flex items-center gap-1'>
                <MapPin size={10} /> {isRemote ? 'Remote' : 'On-site'}
              </span>
            </div>
          </div>
          <div className='flex items-center gap-2 self-start rounded-full bg-surface px-ui-md py-ui-xs micro-text md:self-center'>
            <Calendar size={10} /> {formatDate(startDate)} —{' '}
            {isCurrent ? 'PRESENT' : endDate ? formatDate(endDate) : ''}
          </div>
        </div>

        <div className='space-y-ui-sm'>
          {description.trim().startsWith('<') ? (
            <div
              className='experience-description prose prose-sm dark:prose-invert max-w-none text-content-secondary prose-p:leading-relaxed prose-li:marker:text-brand prose-headings:text-content-primary prose-ul:pl-4 prose-li:my-1 prose-p:my-2'
              dangerouslySetInnerHTML={{ __html: sanitize(description) }}
            />
          ) : (
            description.split('\n').map((point, i) => (
              <div
                className='flex gap-ui-sm text-sm leading-relaxed text-content-secondary'
                key={i}
              >
                <ChevronRight className='mt-1 shrink-0 text-brand' size={14} />
                <p>{point.trim()}</p>
              </div>
            ))
          )}
        </div>

        {skills && (
          <div className='flex flex-wrap gap-ui-xs pt-ui-xs'>
            {skills.map(skill => (
              <span
                className='rounded-sm border border-border bg-surface px-2 py-1 text-[8px] font-bold uppercase tracking-widest text-content-tertiary transition-colors group-hover:border-brand/20 group-hover:text-brand/60'
                key={skill}
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
