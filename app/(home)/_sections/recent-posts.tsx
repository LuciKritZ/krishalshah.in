import { ArrowRight } from 'lucide-react';

import EventLink from '@/components/event-link';
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

            <EventLink
              className={cn(
                buttonVariants({
                  className: 'p-0',
                  size: 'sm',
                  variant: 'link',
                }),
                'no-underline mt-8 inline-flex items-center gap-2 text-muted-foreground font-semibold'
              )}
              eventName='Clicked on All Posts'
              eventProps={{
                from: 'All posts',
              }}
              href='/posts'
            >
              <span>All posts</span>
              <ArrowRight className='size-5' />
            </EventLink>
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
