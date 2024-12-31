import { Metadata } from 'next';

import RedirectToPosts from '@/components/redirect-to-posts';
import { sortTagsByCount } from '@/lib/posts';
import { getAllTags } from '@/rest';

import SearchableTags from './_components/searchable-tags';

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
        <RedirectToPosts linkText='Go to posts' />

        <h1 className='title mb-12'>Tags</h1>

        <SearchableTags tags={tags} sortedTags={sortedTags} />
      </div>
    </section>
  );
};

export default TagsPage;
