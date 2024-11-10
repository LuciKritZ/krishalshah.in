import Link from 'next/link';

import { PostMetadata } from '@/global-types';
import { formatDate } from '@/lib/date';

interface PostsProps {
  posts: PostMetadata[];
}

const Posts = ({ posts }: PostsProps) => (
  <ul className='flex flex-col gap-8'>
    {posts.map(({ slug, title, summary, publishedAt }) => (
      <li key={slug}>
        <Link
          href={`/posts/${slug}`}
          className='flex flex-col justify-between gap-x-4 gap-y-1 sm:flex-row'
        >
          <div className='max-w-lg'>
            <p className='text-lg font-semibold'>{title}</p>
            <p className='mt-1 line-clamp-2 text-sm font-normal text-muted-foreground'>
              {summary}
            </p>
          </div>

          {publishedAt && (
            <p className='mt-1 text-sm font-light'>{formatDate(publishedAt)}</p>
          )}
        </Link>
      </li>
    ))}
  </ul>
);

export default Posts;
