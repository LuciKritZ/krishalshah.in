import { Metadata } from 'next';

import PageContainer from '@/components/atoms/page-container';
import Section from '@/components/atoms/section';
import { dbConnection } from '@/database/db-connection';
import Experience from '@/database/models/experience';
import { ExperienceType } from '@/types/experience';

import ExperienceTimeline from './_components/experience-timeline';

export const metadata: Metadata = {
  description: 'A timeline of my professional journey and experiences.',
  title: 'Experience',
};

export default async function ExperiencePage() {
  let experiences: ExperienceType[] = [];
  try {
    await dbConnection();
    const data = await Experience.find({}).sort({ startDate: -1 }).lean();
    experiences = data.map(exp => ({
      ...exp,
      _id: exp._id.toString(),
    })) as ExperienceType[];
  } catch (error) {
    console.error('Failed to fetch from DB:', error);
  }

  return (
    <PageContainer>
      <Section>
        <ExperienceTimeline experiences={experiences} />
      </Section>
    </PageContainer>
  );
}
