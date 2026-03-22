import { ArrowUpRight, Github, GitFork, Star } from 'lucide-react';

import SurfaceCard from '@/components/surface-card';
import TagList from '@/components/tag-list';
import { cn } from '@/lib/utils';

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
  title,
  description,
  tags,
  link,
  homepage,
  stars,
  forks,
}: ProjectCardProps) => {
  const hasHomepage = Boolean(homepage && homepage.length > 0);

  return (
    <SurfaceCard className='min-h-[260px] md:min-h-[320px]'>
      <div className='flex flex-1 flex-col'>
        <div className='mb-3 flex items-start justify-between md:mb-4'>
          <h3 className='line-clamp-2 font-display text-lg font-bold tracking-tight text-content-primary/90 transition-colors group-hover:text-content-primary md:text-2xl'>
            {title}
          </h3>
          <div className='flex gap-2'>
            <a
              aria-label='View Source'
              className='rounded-full border border-white/5 bg-white/5 p-2 text-content-tertiary transition-all hover:border-white/20 hover:bg-white/10 hover:text-content-primary'
              href={link}
              rel='noopener noreferrer'
              target='_blank'
            >
              <Github size={16} />
            </a>
            {hasHomepage && (
              <a
                aria-label='View Deployment'
                className='rounded-full border border-brand/20 bg-brand/5 p-2 text-brand/60 transition-all hover:border-brand/40 hover:bg-brand/10 hover:text-brand'
                href={homepage}
                rel='noopener noreferrer'
                target='_blank'
              >
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>

        <p className='mb-6 line-clamp-4 text-xs leading-relaxed text-content-secondary transition-colors group-hover:text-content-primary/80 md:text-sm'>
          {description}
        </p>

        <div className='mt-auto space-y-6'>
          {((stars !== undefined && stars > 0) ||
            (forks !== undefined && forks > 0)) && (
            <div className='flex items-center gap-4'>
              {stars !== undefined && stars > 0 && (
                <div className='flex items-center gap-1.5 rounded-sm border border-white/5 bg-white/5 px-2 py-1 text-[10px] font-bold text-content-tertiary'>
                  <Star
                    className='text-brand'
                    fill='currentColor'
                    fillOpacity={0.2}
                    size={10}
                  />
                  <span>{stars}</span>
                </div>
              )}
              {forks !== undefined && forks > 0 && (
                <div className='flex items-center gap-1.5 rounded-sm border border-white/5 bg-white/5 px-2 py-1 text-[10px] font-bold text-content-tertiary'>
                  <GitFork className='text-brand' size={10} />
                  <span>{forks}</span>
                </div>
              )}
            </div>
          )}

          <div className='flex h-12 items-center border-t border-white/5 pt-4'>
            <TagList limit={3} tags={tags} />
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
};

export default ProjectCard;
