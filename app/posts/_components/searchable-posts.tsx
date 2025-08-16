'use client';

import { useState } from 'react';

import { DeleteIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import EventLink from '@/components/event-link';
import Posts from '@/components/posts';
import QueryPagination from '@/components/query-pagination';
import Tag from '@/components/tag';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { usePosts } from '@/providers/posts-provider';

const SearchablePosts = () => {
  const {
    resetFiltersLink,
    createPaginationLink,
    posts,
    sortedTags,
    tags,
    page,
    selectedTags,
    totalPages,
    createSearchLink,
    createSelectedTagsLink,
    shouldShowReset,
  } = usePosts();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState<string>(
    searchParams.get('searchQuery') ?? ''
  );

  return (
    <div className='mb-12 flex flex-col'>
      <div className='flex items-center gap-3 mb-4'>
        <Input
          className='h-9 w-full sm:w-1/2 focus-visible:ring-offset-0 focus-visible:ring-0'
          onChange={e => {
            setQuery(e.target.value);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              router.push(createSearchLink(query), { scroll: false });
            }
          }}
          placeholder='Search posts...'
          type='text'
          value={query}
        />

        {query.length ? (
          <EventLink
            className={buttonVariants({
              className: 'h-8 px-2 lg:px-3',
              size: 'sm',
              variant: 'secondary',
            })}
            eventName='Clicked on Input Search Submit button - Posts'
            eventProps={{
              input: query,
            }}
            href={createSearchLink(query)}
            shallow
          >
            Submit
          </EventLink>
        ) : null}

        {shouldShowReset ? (
          <EventLink
            className={buttonVariants({
              className: 'h-8 px-2 lg:px-3',
              size: 'sm',
              variant: 'secondary',
            })}
            eventName='Clicked on Input Reset button - Posts'
            href={resetFiltersLink()}
            onClick={() => {
              setQuery('');
            }}
            shallow={true}
          >
            Reset <DeleteIcon className='ml-2 h-4 w-4' />
          </EventLink>
        ) : null}
      </div>

      {!!sortedTags.length ? (
        <div className='flex flex-wrap gap-2 mb-8 items-center'>
          {sortedTags.map(tag => (
            <Tag
              count={tags[tag]}
              disableLink
              isSelected={selectedTags.includes(tag)}
              key={tag}
              onClick={() => {
                const link = createSelectedTagsLink(tag);
                router.push(link, { scroll: false });
              }}
              tag={tag}
            />
          ))}
          <EventLink
            className={cn(
              buttonVariants({
                className:
                  'no-underline rounded-lg text-xs font-semibold py-0.5 px-2.5 m-0 h-auto',
                size: 'sm',
                variant: 'link',
              }),
              'text-muted-foreground'
            )}
            eventName='Clicked on View all [Tags] - Posts'
            href='/tags'
          >
            View all
          </EventLink>
        </div>
      ) : null}

      <Posts posts={posts} />

      {totalPages > 1 ? (
        <QueryPagination
          className='mt-8 justify-end'
          createPaginationLink={createPaginationLink}
          currentPage={page}
          totalPages={totalPages}
        />
      ) : null}
    </div>
  );
};

export default SearchablePosts;
