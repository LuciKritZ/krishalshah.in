'use client';

import { cn } from '@/lib/utils';

export interface TagListProps {
  className?: string;
  limit?: number;
  tags: string[];
  variant?: 'tectonic' | 'white';
}

const TagList = ({
  tags,
  limit = 3,
  variant = 'tectonic',
  className,
}: TagListProps) => {
  const visibleTags = tags.slice(0, limit);
  const hiddenTags = tags.slice(limit);

  const baseStyles =
    'text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded-full border transition-all whitespace-nowrap';
  const variants = {
    tectonic:
      'text-tectonic/60 group-hover:text-tectonic border-tectonic/20 group-hover:border-tectonic/40',
    white: 'text-white/20 border-white/5',
  };

  return (
    <div className={cn('flex flex-wrap gap-2 items-center', className)}>
      {visibleTags.map(tag => (
        <span className={cn(baseStyles, variants[variant])} key={tag}>
          {tag}
        </span>
      ))}
      {hiddenTags.length > 0 && (
        <div className='relative group/tags flex'>
          <span
            className={cn(
              baseStyles,
              'border-dashed cursor-help',
              variants[variant]
            )}
          >
            + {hiddenTags.length} more
          </span>
          <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 invisible group-hover/tags:opacity-100 group-hover/tags:visible transition-all duration-300 z-50'>
            <div className='bg-slab border border-white/10 rounded-sm p-3 slab-shadow min-w-[180px] max-w-[250px] flex flex-wrap gap-2'>
              {hiddenTags.map(tag => (
                <span
                  className={cn(
                    baseStyles,
                    variants[variant],
                    'text-white! border-white/20!'
                  )}
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className='w-2 h-2 bg-slab border-r border-b border-white/10 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2' />
          </div>
        </div>
      )}
    </div>
  );
};

export default TagList;
