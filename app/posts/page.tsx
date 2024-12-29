import SearchablePosts from './_components/searchable-posts';

/**
 * @see https://github.com/vercel/next.js/discussions/58936#discussioncomment-7701179
 */
export const dynamic = 'force-dynamic';

const PostsPage = () => (
  <section className='pb-12 pt-40'>
    <div className='container max-w-3xl flex flex-col post-container'>
      <h1 className='title mb-12'>Posts</h1>
      <SearchablePosts />
    </div>
  </section>
);

export default PostsPage;
