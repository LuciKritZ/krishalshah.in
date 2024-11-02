import Link from 'next/link';

import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';

const RecentPosts = async () => {
  const posts = await getPosts(4);

  return (
    <section className='py-24'>
      <div>
        <h2 className='title mb-12'>Recent Posts</h2>
        <Posts posts={posts} />

        <Link
          href='/posts'
          className='mt-8 inline-flex items-center gap-2 text-muted-foreground underline'
        >
          <span>All posts</span>
        </Link>
      </div>
    </section>
  );
};

export default RecentPosts;
