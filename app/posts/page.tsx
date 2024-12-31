import dynamic from 'next/dynamic';

const SearchablePosts = dynamic(
  () => import('./_components/searchable-posts'),
  { ssr: false }
);

const PostsPage = () => (
  <section className='pb-12 pt-40'>
    <div className='container max-w-3xl flex flex-col post-container'>
      <h1 className='title mb-12'>Posts</h1>
      <SearchablePosts />
    </div>
  </section>
);

export default PostsPage;
