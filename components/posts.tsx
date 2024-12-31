'use client';

import { HTMLAttributes } from 'react';

import { Loader } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { formatDate } from '@/lib/date';
import { cn } from '@/lib/utils';
import { PostMetadata } from '@/types/global-types';

import Tag from './tag';
import { Button } from './ui/button';

interface PostsProps {
  posts: PostMetadata[] | undefined;
  className?: HTMLAttributes<HTMLUListElement>['className'];
}

const Posts = ({ posts, className = '' }: PostsProps) => {
  const router = useRouter();

  if (!posts) {
    return (
      <ul className='flex flex-col gap-8 justify-center items-center post-list-container'>
        <Loader className='size-5' />
      </ul>
    );
  }

  return (
    <ul className={cn('flex flex-col gap-8', className)}>
      {!!posts?.length ? (
        posts.map(({ slug, title, summary, image, publishedAt, tags = [] }) => (
          <li
            key={slug}
            className='p-4 border-border border-[1px] group/post-card hover:bg-card'
          >
            <div
              onClick={() => router.push(`/posts/${slug}`)}
              className='flex flex-col md:flex-row justify-between cursor-pointer'
            >
              <div className='flex-1 md:mr-10 space-y-2'>
                {publishedAt && (
                  <p className='text-sm font-light'>
                    {formatDate(publishedAt)}
                  </p>
                )}
                <p className='text-lg font-semibold group-hover/post-card:underline'>
                  {title}
                </p>
                {tags.length ? (
                  <div className='text-sm py-1 space-x-2'>
                    {tags.map((tag) => (
                      <Tag key={tag} tag={tag} />
                    ))}
                  </div>
                ) : null}
                <p className='line-clamp-2 text-sm font-normal text-muted-foreground text-ellipsis overflow-x-hidden max-w-fit'>
                  {summary}
                </p>
                <div className='mt-4'>
                  <Button
                    variant='link'
                    className='m-0 p-0 text-sm h-auto text-muted-foreground'
                  >
                    Read more...
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
        ))
      ) : (
        <div className='justify-center items-center my-auto mx-0 text-center'>
          No posts found!
        </div>
      )}
    </ul>
  );
};

export default Posts;
