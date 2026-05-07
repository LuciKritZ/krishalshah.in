import { Metadata } from 'next';

import PageContainer from '@/components/atoms/page-container';
import Section from '@/components/atoms/section';

import ExperienceTimeline from './_components/experience-timeline';

export const metadata: Metadata = {
  description: 'A timeline of my professional journey and experiences.',
  title: 'Experience',
};

export default function ExperiencePage() {
  return (
    <PageContainer>
      <Section>
        <ExperienceTimeline />
      </Section>
    </PageContainer>
  );
}
