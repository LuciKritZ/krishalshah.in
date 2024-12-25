import { Metadata } from 'next';

import { siteConfig } from '@/config';

import Experience from './_sections/experience';
import Skills from './_sections/skills';
import Introduction from '../(home)/_sections/introduction';

export const metadata: Metadata = {
  title: 'About',
  description: siteConfig.description,
};

const About = async () => {
  return (
    <div className='container max-w-3xl py-24'>
      <Introduction />
      <Experience />
      <Skills />
    </div>
  );
};

export default About;
