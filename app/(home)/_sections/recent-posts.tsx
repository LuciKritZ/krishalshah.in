import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import Posts from '@/components/posts';
import { buttonVariants } from '@/components/ui/button';
import { getPosts } from '@/lib/server/posts';
import { cn } from '@/lib/utils';

const RecentPosts = async () => {
  const { posts } = await getPosts();

  return (
    <section className='py-24'>
      <div>
        <h2 className='title mb-12'>Recent Posts</h2>
        {!!posts.length ? (
          <>
            <Posts posts={posts} />

            <Link
              href='/posts'
              className={cn(
                buttonVariants({
                  variant: 'link',
                  size: 'sm',
                  className: 'p-0',
                }),
                'no-underline mt-8 inline-flex items-center gap-2 text-muted-foreground font-semibold'
              )}
            >
              <span>All posts</span>
              <ArrowRight className='size-5' />
            </Link>
          </>
        ) : (
          <span className='text-muted-foreground text-balance'>
            No recent posts found.
          </span>
        )}
      </div>
    </section>
  );
};

export default RecentPosts;
