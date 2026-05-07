import { Hourglass } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import MDXContent from '@/components/atoms/mdx/mdx-content';
import PageContainer from '@/components/atoms/page-container';
import Section from '@/components/atoms/section';
import PostCard from '@/components/molecules/post-card';
import RedirectToPosts from '@/components/molecules/redirect-to-posts';
import TagList from '@/components/molecules/tag-list';
import { siteConfig } from '@/config';
import { formatDate } from '@/lib/date';
import { getPostBySlug, getPosts } from '@/lib/server/posts';
import { calculateReadTime } from '@/lib/utils';

type IndividualPostProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: IndividualPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.metadata.title) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();

  ogSearchParams.set('title', post.metadata.title);

  return {
    authors: [{ name: siteConfig.author, url: siteConfig.url }],
    description: post.metadata.summary,
    openGraph: {
      description: post.metadata.summary,
      images: [
        {
          alt: post.metadata.title,
          height: 630,
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
        },
      ],
      siteName: siteConfig.name,
      title: post.metadata.title,
      type: 'article',
      url: `${siteConfig.url}/posts/${slug}`,
    },
    title: post.metadata.title,
    twitter: {
      card: 'summary_large_image',
      description: post.metadata.summary,
      images: [`/api/og?${ogSearchParams.toString()}`],
      title: post.metadata.title,
    },
  };
}

export async function generateStaticParams() {
  const { posts } = await getPosts();
  return posts.map(post => ({ slug: post.slug }));
}

const IndividualPost = async ({ params }: IndividualPostProps) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { content, metadata } = post;
  const { author, image, publishedAt, tags = [], title } = metadata;

  const readTime = calculateReadTime(content);

  // Fetch other posts for the bottom section
  const { posts: allPosts } = await getPosts();
  const otherPosts = allPosts.filter(p => p.slug !== slug).slice(0, 2);

  return (
    <PageContainer>
      <Section className='max-w-3xl mx-auto'>
        <RedirectToPosts />

        <header className='mb-12'>
          {image && (
            <div className='relative mb-10 aspect-video w-full overflow-hidden rounded-lg border border-border bg-surface/50'>
              <Image
                alt={title ?? ''}
                className='object-cover'
                fill
                priority
                src={image}
              />
            </div>
          )}

          <div className='flex flex-wrap gap-3 mb-6'>
            <TagList tags={tags} />
          </div>

          <h1 className='font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] mb-6 text-content-primary'>
            {title}
          </h1>

          <div className='flex flex-wrap items-center gap-x-6 gap-y-3 text-content-tertiary'>
            <div className='flex items-center gap-2'>
              <div className='h-6 w-6 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-[10px] font-bold text-brand'>
                {author?.[0]}
              </div>
              <span className='text-sm font-medium text-content-secondary'>
                {author}
              </span>
            </div>
            <span className='h-1 w-1 rounded-full bg-border' />
            <time className='text-sm font-medium' dateTime={publishedAt}>
              {formatDate(publishedAt ?? '')}
            </time>
            <span className='h-1 w-1 rounded-full bg-border' />
            <div className='flex items-center gap-1.5 text-sm font-medium'>
              <Hourglass className='text-brand' size={14} />
              <span>{readTime} min read</span>
            </div>
          </div>
        </header>

        <main className='prose dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-p:text-content-secondary prose-headings:text-content-primary'>
          <MDXContent source={content} />
        </main>

        <footer className='mt-16 pt-8 border-t border-border'>
          <div className='flex flex-col gap-4'>
            <p className='micro-text text-content-tertiary'>Tags</p>
            <TagList tags={tags} />
          </div>
        </footer>
      </Section>

      {otherPosts.length > 0 && (
        <Section className='border-t border-border mt-24 pt-24'>
          <div className='flex flex-col gap-12'>
            <div className='flex items-center justify-between'>
              <h2 className='font-display text-3xl font-bold tracking-tight'>
                READ <span className='text-content-tertiary'>NEXT</span>
              </h2>
              <RedirectToPosts linkText='View all posts' />
            </div>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              {otherPosts.map(post => (
                <PostCard key={post.slug} {...post} />
              ))}
            </div>
          </div>
        </Section>
      )}
    </PageContainer>
  );
};

export default IndividualPost;
