import { ArrowLeftIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import MDXContent from '@/components/mdx-content';
import { formatDate } from '@/lib/date';
import { getPostBySlug, getPosts } from '@/lib/posts';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts = await getPosts();
  const slugs = posts.map((post) => ({ slug: post.slug }));

  return slugs;
}

const IndividualPost = async ({ params: { slug } }: Props) => {
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { metadata, content } = post;
  const { title, image, author, publishedAt } = metadata;

  return (
    <section className='pb-24 pt-32'>
      <div className='container max-w-3xl'>
        <Link
          href='/posts'
          className='mb-8 inline-flex items-center gap-2 text-sm font-normal'
        >
          <ArrowLeftIcon className='h-5 w-5' />
          <span>Other Posts</span>
        </Link>

        {image && (
          <div className='relative mb-6 h-96 w-full overflow-hidden rounded-lg'>
            <Image
              src={image}
              alt={title ?? ''}
              className='object-cover'
              fill
              priority
            />
          </div>
        )}

        <header>
          <h1 className='title'>{title}</h1>
          <p className='mt-3 text-sx text-muted-foreground'>
            {author} / {formatDate(publishedAt ?? '')}
          </p>
        </header>

        <main className='prose mt-16 dark:prose-invert'>
          <MDXContent source={content} />
        </main>
      </div>
    </section>
  );
};

export default IndividualPost;
