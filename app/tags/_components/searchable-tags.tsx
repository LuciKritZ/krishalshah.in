'use client';

import { useMemo, useState } from 'react';

import { DeleteIcon } from 'lucide-react';

import Tag from '@/components/tag';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tags } from '@/types/global-types';

interface SearchableTagsProps {
  tags: Tags;
  sortedTags: string[];
}

const SearchableTags = ({ tags, sortedTags }: SearchableTagsProps) => {
  const [query, setQuery] = useState<string>('');

  const filteredSortedTags = useMemo(() => {
    return sortedTags.filter((tag) => tag.includes(query.trim()));
  }, [query, sortedTags]);

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
        />

        {!!query.length ? (
          <Button
            onClick={() => {
              setQuery('');
            }}
            variant='secondary'
            size='sm'
            className='h-8 px-2 lg:px-3'
          >
            Reset <DeleteIcon className='ml-2 h-4 w-4' />
          </Button>
        ) : null}
      </div>

      <div className='flex flex-wrap gap-2'>
        {filteredSortedTags.map((tag) => (
          <Tag key={tag} tag={tag} count={tags[tag]} />
        ))}
      </div>
    </div>
  );
};

export default SearchableTags;
