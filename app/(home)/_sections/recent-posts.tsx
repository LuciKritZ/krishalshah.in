import Link from 'next/link';

import Posts from '@/components/posts';
import { getAllPosts } from '@/rest';

const RecentPosts = async () => {
  const { posts } = await getAllPosts({});

  return (
    <section className='py-24'>
      <div>
        <h2 className='title mb-12'>Recent Posts</h2>
        <Posts posts={posts} />

        <Link
          href='/posts'
          className='mt-8 inline-flex items-center gap-2 text-muted-foreground underline font-semibold'
        >
          <span>All posts</span>
        </Link>
      </div>
    </section>
  );
};

export default RecentPosts;
