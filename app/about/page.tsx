import { siteConfig } from '@/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me',
  description: siteConfig.description,
};

const About = async () => {
  return (
    <section className='py-24'>
      <div className='container max-w-3xl'>About Me</div>
    </section>
  );
};

export default About;
