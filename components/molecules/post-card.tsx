import { Calendar, ChevronRight, Clock } from 'lucide-react';
import Link from 'next/link';

import SurfaceCard from '@/components/atoms/surface-card';
import TagList from '@/components/molecules/tag-list';
import { formatDate } from '@/lib/date';
import { PostMetadata } from '@/types/global-types';

const PostCard = ({
  publishedAt,
  slug,
  summary,
  tags,
  title,
}: PostMetadata) => {
  return (
    <Link className='block' href={`/posts/${slug}`}>
      <SurfaceCard className='flex min-h-[280px] flex-col overflow-visible! hover:z-50'>
        <div className='flex flex-1 flex-col'>
          <div className='mb-6 flex items-center justify-between'>
            <div className='flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand/80'>
              <span className='flex items-center gap-1.5'>
                <Calendar size={12} />
                {publishedAt ? formatDate(publishedAt) : '—'}
              </span>
              <span className='flex items-center gap-1.5'>
                <Clock size={12} />8 min read
              </span>
            </div>
          </div>

          <h3 className='line-clamp-2 font-display mb-4 text-2xl font-bold tracking-tight text-content-primary transition-colors group-hover:text-brand'>
            {title}
          </h3>

          <p className='mb-6 line-clamp-3 text-sm leading-relaxed text-content-secondary transition-colors group-hover:text-content-primary/90'>
            {summary}
          </p>

          <div className='mt-auto space-y-6'>
            <div className='flex items-center'>
              <TagList limit={5} tags={tags || []} />
            </div>

            <div className='flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-content-tertiary transition-colors group-hover:text-brand'>
              Read Post <ChevronRight size={14} />
            </div>
          </div>
        </div>
      </SurfaceCard>
    </Link>
  );
};

export default PostCard;
