import { Metadata } from 'next';

import PageContainer from '@/components/atoms/page-container';
import Section, { SectionHeader } from '@/components/atoms/section';
import { getPosts, getTags } from '@/lib/server/posts';

import PostArchive from './_components/post-archive';

export const metadata: Metadata = {
  description:
    'Observations, technical deep dives, and reflections on the craft of software engineering.',
  title: 'Blog',
};

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  // Parse pagination and filter params
  const q = typeof params.q === 'string' ? params.q : '';
  const tags = typeof params.tags === 'string' ? params.tags.split(',') : [];
  const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
  const limit = typeof params.limit === 'string' ? parseInt(params.limit) : 5;

  // Fetch results and total count from server
  const [{ posts, totalCount, totalPages }, availableTagsMap] =
    await Promise.all([
      getPosts({ limit, page, searchQuery: q, selectedTags: tags }),
      getTags(),
    ]);

  const sortedTags = Object.keys(availableTagsMap).sort(
    (a, b) => availableTagsMap[b] - availableTagsMap[a]
  );

  return (
    <PageContainer>
      <Section className='min-h-screen'>
        <SectionHeader>
          <h1 className='display-title uppercase'>
            The <span className='text-content-tertiary'>Blog</span>
          </h1>
        </SectionHeader>

        <PostArchive
          availableTags={sortedTags}
          currentPage={page}
          initialPosts={posts}
          limit={limit}
          searchQuery={q}
          selectedTags={tags}
          totalCount={totalCount}
          totalPages={totalPages}
        />
      </Section>
    </PageContainer>
  );
}
