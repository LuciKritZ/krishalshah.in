import { Hourglass } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import MDXContent from '@/components/mdx/mdx-content';
import RedirectToPosts from '@/components/redirect-to-posts';
import Tag from '@/components/tag';
import { siteConfig } from '@/config';
import { formatDate } from '@/lib/date';
import { getPostBySlug, getPosts } from '@/lib/server/posts';
import { calculateReadTime } from '@/lib/utils';

type IndividualPostProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: IndividualPostProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post || !post.metadata.title) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();

  ogSearchParams.set('title', post.metadata.title);

  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    authors: { name: siteConfig.author, url: siteConfig.url },
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.summary,
      type: 'article',
      url: post.metadata.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metadata.title,
      description: post.metadata.summary,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}

export async function generateStaticParams() {
  const { posts } = await getPosts();
  const slugs = posts.map((post) => ({ slug: post.slug }));

  return slugs;
}

const IndividualPost = async ({ params: { slug } }: IndividualPostProps) => {
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { metadata, content } = post;
  const { title, image, author, publishedAt, tags = [] } = metadata;

  const readTime = calculateReadTime(content);

  return (
    <article className='pb-24 pt-32'>
      <div className='container max-w-3xl'>
        <RedirectToPosts />

        {image && (
          <div className='relative mb-6 h-96 w-full overflow-hidden rounded-lg border-border border-2 dark:border-none'>
            <Image
              src={image}
              alt={title ?? ''}
              className='object-contain'
              fill
              priority
            />
          </div>
        )}

        <header>
          <h1 className='title'>{title}</h1>
          <div className='flex flex-col justify-between md:flex-row'>
            <p className='mt-6 text-sx text-muted-foreground'>
              {author} / {formatDate(publishedAt ?? '')}
            </p>
            <p className='flex mt-4 text-sm text-muted-foreground md:mt-6'>
              <Hourglass className='size-4 flex mt-[0.2rem] mr-1' /> {readTime}{' '}
              min read
            </p>
          </div>
        </header>

        <main className='prose mt-16 dark:prose-invert'>
          <MDXContent source={content} />
        </main>

        <div className='flex gap-2 my-6 flex-col'>
          <p className='title-xl'>Tags</p>
          <div className='flex flex-wrap gap-2 my-6'>
            {tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default IndividualPost;
