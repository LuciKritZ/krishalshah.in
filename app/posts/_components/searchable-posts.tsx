'use client';

import { useMemo, useState } from 'react';

import { DeleteIcon } from 'lucide-react';

import QueryPagination from '@/components/query-pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PostMetadata } from '@/global-types';

import Posts from '../../../components/posts';

const POSTS_PER_PAGE = 5;

interface SearchablePostsProps {
  posts: PostMetadata[];
  currentPage: number;
}

const SearchablePosts = ({ posts, currentPage }: SearchablePostsProps) => {
  const [query, setQuery] = useState<string>('');

  // TODO: Disable pagination and use infinite scrolling
  const filteredData = useMemo(() => {
    const filteredPosts = posts
      .filter((post) => post.title?.toLowerCase().includes(query.toLowerCase()))
      .slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage);
    return {
      posts: filteredPosts,
      isFiltered: query.length,
      totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    };
  }, [posts, query, currentPage]);

  const resetFilter = () => setQuery('');

  return (
    <div className='mb-12 flex flex-col'>
      <div className='flex items-center gap-3 mb-8'>
        <Input
          // TODO: Enable search functionality
          disabled
          type='text'
          placeholder='Search posts...'
          className='h-9 w-full sm:w-1/2 focus-visible:ring-offset-0 focus-visible:ring-0'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {filteredData.isFiltered ? (
          <Button
            size='sm'
            variant='secondary'
            onClick={resetFilter}
            className='h-8 px-2 lg:px-3'
          >
            Reset <DeleteIcon className='ml-2 h-4 w-4' />
          </Button>
        ) : null}
      </div>

      <Posts posts={filteredData.posts} />

      <QueryPagination
        className='mt-8 justify-end'
        totalPages={filteredData.totalPages}
      />
    </div>
  );
};

export default SearchablePosts;
