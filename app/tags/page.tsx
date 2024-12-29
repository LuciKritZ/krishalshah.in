import { Metadata } from 'next';

import Tag from '@/components/tag';
import { sortTagsByCount } from '@/lib/posts';
import { getAllTags } from '@/rest';

export const metadata: Metadata = {
  title: 'Tags',
  description: 'All the topics that I have written about',
};

const TagsPage = async () => {
  const tags = await getAllTags();

  const sortedTags = sortTagsByCount(tags);

  return (
    <section className='pb-12 pt-40'>
      <div className='container max-w-3xl'>
        <h1 className='title mb-12'>Tags</h1>
        <div className='flex flex-wrap gap-2'>
          {sortedTags.map((tag) => (
            <Tag key={tag} tag={tag} count={tags[tag]} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TagsPage;
