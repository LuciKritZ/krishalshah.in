import { getPosts } from '@/lib/posts';

import SearchablePosts from './_components/searchable-posts';

const PostsPage = async () => {
  const posts = await getPosts();
  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <h1 className='title mb-12'>Posts</h1>
        <SearchablePosts posts={posts} />
      </div>
    </section>
  );
};

export default PostsPage;
