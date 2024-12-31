import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import Posts from '@/components/posts';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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
          className={cn(
            buttonVariants({ variant: 'link', size: 'sm', className: 'p-0' }),
            'no-underline mt-8 inline-flex items-center gap-2 text-muted-foreground font-semibold'
          )}
        >
          <span>All posts</span>
          <ArrowRight className='size-5' />
        </Link>
      </div>
    </section>
  );
};

export default RecentPosts;
