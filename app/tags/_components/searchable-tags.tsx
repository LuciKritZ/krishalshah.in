'use client';

import { useMemo, useState } from 'react';

import { DeleteIcon } from 'lucide-react';

import EventButton from '@/components/event-button';
import Tag from '@/components/tag';
import { Input } from '@/components/ui/input';
import { Tags } from '@/types/global-types';

interface SearchableTagsProps {
  sortedTags: string[];
  tags: Tags;
}

const SearchableTags = ({ tags, sortedTags }: SearchableTagsProps) => {
  const [query, setQuery] = useState<string>('');

  const filteredSortedTags = useMemo(() => {
    return sortedTags.filter(tag => tag.includes(query.trim()));
  }, [query, sortedTags]);

  return (
    <div className='mb-12 flex flex-col'>
      <div className='flex items-center gap-3 mb-4'>
        <Input
          className='h-9 w-full sm:w-1/2 focus-visible:ring-offset-0 focus-visible:ring-0'
          onChange={e => {
            setQuery(e.target.value);
          }}
          placeholder='Search tags...'
          type='text'
          value={query}
        />

        {!!query.length ? (
          <EventButton
            className='h-8 px-2 lg:px-3'
            eventName='Clicked on Reset Button - Searchable Tags'
            onClick={() => {
              setQuery('');
            }}
            size='sm'
            variant='secondary'
          >
            Reset <DeleteIcon className='ml-2 h-4 w-4' />
          </EventButton>
        ) : null}
      </div>

      <div className='flex flex-wrap gap-2'>
        {filteredSortedTags.map(tag => (
          <Tag count={tags[tag]} key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
};

export default SearchableTags;
