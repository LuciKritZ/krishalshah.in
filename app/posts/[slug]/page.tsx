import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import MDXContent from '@/components/mdx-content';
import RedirectToPosts from '@/components/redirect-to-posts';
import Tag from '@/components/tag';
import { siteConfig } from '@/config';
import { formatDate } from '@/lib/date';
import { getPostBySlug, getPosts } from '@/lib/posts';

type IndividualPostProps = {
  params: {
    slug: string;
  };
};

/**
 * @see https://github.com/vercel/next.js/discussions/58936#discussioncomment-7701179
 */
export const dynamic = 'force-dynamic';

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
  const posts = await getPosts();
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

  return (
    <article className='pb-24 pt-32'>
      <div className='container max-w-3xl'>
        <RedirectToPosts />

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
          <div className='flex gap-2 my-6'>
            {tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
          <p className='mt-3 text-sx text-muted-foreground'>
            {author} / {formatDate(publishedAt ?? '')}
          </p>
        </header>

        <main className='prose mt-16 dark:prose-invert'>
          <MDXContent source={content} />
        </main>
      </div>
    </article>
  );
};

export default IndividualPost;
