import { getPosts } from '@/lib/posts';

import SearchablePosts from './_components/searchable-posts';
import { Metadata } from 'next';
import Tag from '@/components/tag';
import { getAllTags, sortTagsByCount } from '@/lib/tags';

export const metadata: Metadata = {
  title: 'My posts',
  description: 'Read my mind out with my posts.',
};

interface PostsPageParams {
  searchParams: {
    page?: string;
  };
}

const PostsPage = async ({ searchParams }: PostsPageParams) => {
  const currentPage = Number(searchParams?.page) || 1;
  const posts = await getPosts();
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <section className='pb-12 pt-40'>
      <div className='container max-w-3xl'>
        <div className='flex flex-wrap gap-2 mb-8'>
          {sortedTags.map((tag) => (
            <Tag tag={tag} key={tag} count={tags[tag]} />
          ))}
        </div>
        <h1 className='title mb-12'>Posts</h1>
        <SearchablePosts posts={posts} currentPage={currentPage} />
      </div>
    </section>
  );
};

export default PostsPage;
