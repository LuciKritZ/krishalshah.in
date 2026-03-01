'use client';

import { HTMLAttributes } from 'react';

import { Loader } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { trackEvent } from '@/lib/analytics';
import { formatDate } from '@/lib/date';
import { cn } from '@/lib/utils';
import { PostMetadata } from '@/types/global-types';

import EventButton from './event-button';
import Tag from './tag';

interface PostsProps {
  className?: HTMLAttributes<HTMLUListElement>['className'];
  posts: PostMetadata[] | undefined;
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
        posts.map(({ slug, title, summary, image, publishedAt, tags = [] }) => {
          const { eventName, eventProps } = {
            eventName: `Clicked on the post - ${title}`,
            eventProps: {
              slug: slug ?? '',
              summary: summary ?? '',
              title: title ?? '',
            },
          };
          // Only show 3 tags when rendering posts
          const renderedTags = tags.slice(0, 3);
          const additionalTags = tags.length - renderedTags.length;
          return (
            <li
              className='p-4 border-border border group/post-card hover:bg-border/50 rounded-sm overflow-hidden transition-colors ease-linear duration-200'
              key={slug}
            >
              <div
                className='flex flex-col md:flex-row justify-between cursor-pointer'
                onClick={() => {
                  trackEvent(eventName, eventProps);
                  router.push(`/posts/${slug}`);
                }}
              >
                <div className='flex-1 md:mr-10 space-y-2'>
                  {publishedAt && (
                    <p className='text-sm font-light italic'>
                      {formatDate(publishedAt)}
                    </p>
                  )}
                  <p className='text-lg font-semibold group-hover/post-card:underline'>
                    {title}
                  </p>
                  {tags.length ? (
                    <div className='text-sm py-1 space-x-2 overflow-hidden h-[36px]'>
                      {renderedTags.map(tag => (
                        <Tag key={tag} tag={tag} />
                      ))}
                      <span className='text-xs font-light'>
                        {!!additionalTags ? `+${additionalTags} more` : null}
                      </span>
                    </div>
                  ) : null}
                  <p className='line-clamp-2 text-sm font-normal text-muted-foreground text-ellipsis overflow-x-hidden max-w-fit'>
                    {summary}
                  </p>
                  <div className='mt-4'>
                    <EventButton
                      className='m-0 p-0 text-sm h-auto text-muted-foreground'
                      eventName={`Clicked on Read more for the post ${title}`}
                      eventProperties={eventProps}
                      variant='link'
                    >
                      Read more...
                    </EventButton>
                  </div>
                </div>
                <div className='hidden md:flex justify-center items-center'>
                  {image && (
                    <div className='relative w-36 h-36 overflow-hidden rounded-lg my-auto mx-0 border-border border-2 dark:border-none'>
                      <Image
                        alt={title ?? ''}
                        className='object-cover'
                        fill
                        priority
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        src={image}
                      />
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })
      ) : (
        <div className='flex justify-center items-center my-auto mx-0 text-center post-list-container'>
          No posts found!
        </div>
      )}
    </ul>
  );
};

export default Posts;
