import TagList from '@/components/tag-list';
import TectonicSlab from '@/components/tectonic-slab';
import { cn } from '@/lib/utils';

export interface BlogCardProps {
  children?: React.ReactNode;
  className?: string;
  date?: string;
  slug?: string;
  summary?: string;
  tags?: string[];
  title: string;
}

const BlogCard = ({
  title,
  summary,
  date,
  tags = [],
  slug,
  children,
  className,
}: BlogCardProps) => (
  <TectonicSlab className={cn('min-h-[200px]', className)}>
    <div className='flex flex-1 flex-col'>
      {date && <p className='micro-text mb-2 text-white/40'>{date}</p>}
      <h3 className='line-clamp-2 font-display text-lg font-bold tracking-tight text-white/90 transition-colors group-hover:text-white md:text-xl'>
        {title}
      </h3>
      {summary && (
        <p className='mt-2 line-clamp-2 text-sm leading-relaxed text-white/60 transition-colors group-hover:text-white/80'>
          {summary}
        </p>
      )}
      {tags.length > 0 && (
        <div className='mt-4 flex h-10 items-center border-t border-white/5 pt-3'>
          <TagList limit={3} tags={tags} variant='white' />
        </div>
      )}
      {children}
    </div>
  </TectonicSlab>
);

export default BlogCard;
