'use client';

import { useState } from 'react';

import { DeleteIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

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
    isLoading,
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
          type='text'
          placeholder='Search posts...'
          className='h-9 w-full sm:w-1/2 focus-visible:ring-offset-0 focus-visible:ring-0'
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              router.push(createSearchLink(query), { scroll: false });
            }
          }}
        />

        {query.length ? (
          <Link
            href={createSearchLink(query)}
            className={buttonVariants({
              size: 'sm',
              variant: 'secondary',
              className: 'h-8 px-2 lg:px-3',
            })}
            shallow
          >
            Submit
          </Link>
        ) : null}

        {shouldShowReset ? (
          <Link
            href={resetFiltersLink()}
            onClick={() => {
              setQuery('');
            }}
            className={buttonVariants({
              size: 'sm',
              variant: 'secondary',
              className: 'h-8 px-2 lg:px-3',
            })}
            shallow={true}
          >
            Reset <DeleteIcon className='ml-2 h-4 w-4' />
          </Link>
        ) : null}
      </div>

      {!!sortedTags.length || !isLoading ? (
        <div className='flex flex-wrap gap-2 mb-8 items-center'>
          {sortedTags.map((tag) => (
            <Tag
              tag={tag}
              key={tag}
              count={tags[tag]}
              isSelected={selectedTags.includes(tag)}
              onClick={() => {
                const link = createSelectedTagsLink(tag);
                router.push(link, { scroll: false });
              }}
              disableLink
            />
          ))}
          <Link
            className={cn(
              buttonVariants({
                variant: 'link',
                size: 'sm',
                className:
                  'no-underline rounded-lg text-xs font-semibold py-0.5 px-2.5 m-0 h-auto',
              }),
              'text-muted-foreground'
            )}
            href='/tags'
          >
            View all
          </Link>
        </div>
      ) : null}

      <Posts posts={posts} />

      <QueryPagination
        currentPage={page}
        className='mt-8 justify-end'
        createPaginationLink={createPaginationLink}
        isLoading={isLoading}
        totalPages={totalPages}
      />
    </div>
  );
};

export default SearchablePosts;
