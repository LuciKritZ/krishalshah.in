import Link from 'next/link';

import PageContainer from '@/components/atoms/page-container';
import Section from '@/components/atoms/section';
import ProjectCard from '@/components/molecules/project-card';
import { getGithubProjects } from '@/lib/server/github';

const Work = async () => {
  const { projects: topProjects } = await getGithubProjects(1, 6);

  return (
    <Section id='work'>
      <PageContainer isFluid>
        <header className='mb-16 md:mb-24'>
          <div className='flex flex-col gap-8 md:flex-row md:items-end md:justify-between'>
            <div className='flex max-w-3xl flex-col gap-4'>
              <h2 className='font-display text-4xl font-bold tracking-tighter uppercase md:text-6xl lg:text-7xl'>
                Open <span className='text-content-tertiary'>Source</span>
              </h2>
            </div>

            <div className='flex flex-col items-start gap-4 md:items-end'>
              <Link
                className='text-brand group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all'
                href='/projects'
              >
                <span>View Projects</span>
                <svg
                  className='transition-transform group-hover:translate-x-1'
                  fill='none'
                  height='12'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='3'
                  viewBox='0 0 24 24'
                  width='12'
                >
                  <path d='m9 18 6-6-6-6' />
                </svg>
              </Link>
            </div>
          </div>
        </header>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {topProjects.map((project, i) => (
            <div className={i >= 3 ? 'hidden md:block' : ''} key={project.id}>
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </PageContainer>
    </Section>
  );
};

export default Work;
