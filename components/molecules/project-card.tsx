import { ArrowUpRight, GitFork, Github, Star } from 'lucide-react';

import SurfaceCard from '@/components/atoms/surface-card';
import TagList from '@/components/molecules/tag-list';

export interface ProjectCardProps {
  description: string;
  forks?: number;
  homepage?: string;
  link: string;
  stars?: number;
  tags: string[];
  title: string;
}

const ProjectCard = ({
  description,
  forks,
  homepage,
  link,
  stars,
  tags,
  title,
}: ProjectCardProps) => {
  const hasHomepage = Boolean(homepage && homepage.length > 0);

  return (
    <SurfaceCard className='flex min-h-[280px] flex-col overflow-visible! hover:z-50'>
      <div className='flex flex-1 flex-col'>
        <div className='mb-ui-md flex items-start justify-between'>
          <div className='flex flex-col gap-2'>
            <h3 className='line-clamp-1 font-display text-2xl font-bold tracking-tight text-content-primary transition-colors group-hover:text-brand'>
              {title}
            </h3>
          </div>
          <div className='flex gap-ui-sm'>
            <a
              aria-label='View Source'
              className='rounded-full border border-border bg-surface/50 p-2.5 text-content-tertiary transition-all hover:border-brand/20 hover:bg-brand/5 hover:text-brand'
              href={link}
              rel='noopener noreferrer'
              target='_blank'
            >
              <Github size={18} />
            </a>
            {hasHomepage && (
              <a
                aria-label='View Deployment'
                className='rounded-full border border-brand/20 bg-brand/5 p-2.5 text-brand/60 transition-all hover:border-brand/40 hover:bg-brand/10 hover:text-brand'
                href={homepage}
                rel='noopener noreferrer'
                target='_blank'
              >
                <ArrowUpRight size={18} />
              </a>
            )}
          </div>
        </div>

        <p className='mb-ui-xl line-clamp-3 text-sm leading-relaxed text-content-secondary transition-colors group-hover:text-content-primary/90'>
          {description}
        </p>

        <div className='mt-auto space-y-ui-lg'>
          {((stars !== undefined && stars > 0) ||
            (forks !== undefined && forks > 0)) && (
            <div className='flex items-center gap-ui-md'>
              {stars !== undefined && stars > 0 && (
                <div className='flex items-center gap-1.5 rounded-sm border border-border bg-surface/50 px-2.5 py-1 text-[10px] font-bold text-content-tertiary transition-colors group-hover:border-brand/20 group-hover:text-brand/80'>
                  <Star className='text-brand' fill='currentColor' size={10} />
                  <span>{stars}</span>
                </div>
              )}
              {forks !== undefined && forks > 0 && (
                <div className='flex items-center gap-1.5 rounded-sm border border-border bg-surface/50 px-2.5 py-1 text-[10px] font-bold text-content-tertiary transition-colors group-hover:border-brand/20 group-hover:text-brand/80'>
                  <GitFork className='text-brand' size={10} />
                  <span>{forks}</span>
                </div>
              )}
            </div>
          )}

          <div className='flex items-center pt-ui-md'>
            <TagList limit={6} tags={tags} />
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
};

export default ProjectCard;
