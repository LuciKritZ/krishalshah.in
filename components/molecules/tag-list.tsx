'use client';

import { cn } from '@/lib/utils';

export interface TagListProps {
  className?: string;
  limit?: number;
  tags: string[];
  variant?: 'accent' | 'white';
}

const TagList = ({
  className,
  limit = 3,
  tags,
  variant = 'accent',
}: TagListProps) => {
  const visibleTags = tags.slice(0, limit);
  const hiddenTags = tags.slice(limit);

  const baseStyles =
    'text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border transition-all whitespace-nowrap';
  const variants = {
    accent:
      'text-brand/80 dark:text-brand/70 group-hover:text-brand border-brand/20 dark:border-brand/30 group-hover:border-brand/50',
    white: 'text-content-primary/60 dark:text-content-primary/40 border-border',
  };

  return (
    <div
      className={cn('flex flex-wrap gap-x-2 gap-y-1.5 items-center', className)}
    >
      {visibleTags.map(tag => (
        <span className={cn(baseStyles, variants[variant])} key={tag}>
          {tag}
        </span>
      ))}
      {hiddenTags.length > 0 && (
        <div className='relative group/tags flex shrink-0'>
          <span
            className={cn(
              baseStyles,
              'border-dashed cursor-pointer',
              variants[variant]
            )}
          >
            + {hiddenTags.length} more
          </span>
          <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 invisible group-hover/tags:opacity-100 group-hover/tags:visible group-hover/tags:translate-y-0 translate-y-1 scale-95 group-hover/tags:scale-100 transition-all duration-200 z-50'>
            <div className='flex min-w-[180px] max-w-[250px] flex-wrap gap-2 rounded-sm border border-border bg-background p-3 shadow-2xl shadow-black/20'>
              {hiddenTags.map(tag => (
                <span
                  className={cn(
                    baseStyles,
                    variants[variant],
                    'text-content-primary! border-border!'
                  )}
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className='absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-r border-b border-border bg-background' />
          </div>
        </div>
      )}
    </div>
  );
};

export default TagList;
