'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { PostMetadata } from '@/global-types';
import { formatDate } from '@/lib/date';

import Tag from './tag';
import { Button } from './ui/button';

interface PostsProps {
  posts: PostMetadata[];
}

const Posts = ({ posts }: PostsProps) => {
  const router = useRouter();
  return (
    <ul className='flex flex-col gap-8'>
      {posts.map(({ slug, title, summary, image, publishedAt, tags = [] }) => (
        <li key={slug} className='pb-4 border-border border-b-[1px]'>
          <div
            onClick={() => router.push(`/posts/${slug}`)}
            className='flex flex-col md:flex-row justify-between cursor-pointer'
          >
            <div className='flex-1 md:mr-10 space-y-2'>
              {publishedAt && (
                <p className='text-sm font-light'>{formatDate(publishedAt)}</p>
              )}
              <p className='text-lg font-semibold'>{title}</p>
              <p className='line-clamp-2 text-sm font-normal text-muted-foreground text-ellipsis overflow-x-hidden max-w-fit'>
                {summary}
              </p>
              {tags.length ? (
                <div className='text-sm py-1 space-x-2'>
                  {tags.map((tag) => (
                    <Tag key={tag} tag={tag} />
                  ))}
                </div>
              ) : null}
              <div className='mt-4'>
                <Button variant='link' className='m-0 p-0 text-sm h-auto'>
                  Read more
                </Button>
              </div>
            </div>
            <div className='hidden md:flex justify-center items-center'>
              {image && (
                <div className='relative mb-6 w-36 h-36 overflow-hidden rounded-lg'>
                  <Image
                    src={image}
                    alt={title ?? ''}
                    className='object-cover'
                    fill
                    priority
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Posts;
