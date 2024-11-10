import { getPosts } from '@/lib/posts';

import SearchablePosts from './_components/searchable-posts';

interface PostsPageParams {
  searchParams: {
    page?: string;
  };
}

const PostsPage = async ({ searchParams }: PostsPageParams) => {
  const currentPage = Number(searchParams?.page) || 1;
  const posts = await getPosts();
  return (
    <section className='pb-12 pt-40'>
      <div className='container max-w-3xl'>
        <h1 className='title mb-12'>Posts</h1>
        <SearchablePosts posts={posts} currentPage={currentPage} />
      </div>
    </section>
  );
};

export default PostsPage;
