import { Metadata } from 'next';

import PageContainer from '@/components/atoms/page-container';
import Section from '@/components/atoms/section';
import { getGithubLanguages, getGithubProjects } from '@/lib/server/github';

import ProjectArchive from './_components/project-archive';

export const metadata: Metadata = {
  description:
    'A comprehensive collection of open-source projects, experiments, and technical explorations fetched directly from GitHub.',
  title: 'Code Archive',
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  // Parse pagination and filter params
  const q = typeof params.q === 'string' ? params.q : '';
  const lang = typeof params.lang === 'string' ? params.lang.split(',') : [];
  const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
  const limit = typeof params.limit === 'string' ? parseInt(params.limit) : 8;

  // Fetch results and total count from GitHub
  const [{ projects, totalCount }, availableLanguages] = await Promise.all([
    getGithubProjects(page, limit, q, lang),
    getGithubLanguages(),
  ]);

  return (
    <PageContainer>
      <Section className='min-h-screen'>
        <ProjectArchive
          availableLanguages={availableLanguages}
          currentPage={page}
          initialProjects={projects}
          limit={limit}
          searchQuery={q}
          selectedLanguages={lang}
          totalCount={totalCount}
        />
      </Section>
    </PageContainer>
  );
}
