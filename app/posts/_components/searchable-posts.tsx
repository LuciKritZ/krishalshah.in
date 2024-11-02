'use client';

import { useMemo, useState } from 'react';

import { DeleteIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PostMetadata } from '@/global-types';

import Posts from '../../../components/posts';

interface SearchablePostsProps {
  posts: PostMetadata[];
}

const SearchablePosts = ({ posts }: SearchablePostsProps) => {
  const [query, setQuery] = useState<string>('');

  const filteredData = useMemo(
    () => ({
      posts: posts.filter((post) =>
        post.title?.toLowerCase().includes(query.toLowerCase())
      ),
      isFiltered: query.length,
    }),
    [posts, query]
  );

  const resetFilter = () => setQuery('');

  return (
    <div>
      <div className='mb-12 flex items-center gap-3'>
        <Input
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
    </div>
  );
};

export default SearchablePosts;
