import PostsClientWrapper from './_components/posts-client-wrapper';

const PostsPage = () => (
  <section className='pb-12 pt-40'>
    <div className='container max-w-3xl flex flex-col post-container'>
      <h1 className='title mb-12'>Posts</h1>
      <PostsClientWrapper />
    </div>
  </section>
);

export default PostsPage;
