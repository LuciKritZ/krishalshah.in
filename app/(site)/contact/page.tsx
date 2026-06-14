import { Metadata } from 'next';

import BodyText from '@/components/atoms/body-text';
import DisplayTitle from '@/components/atoms/display-title';
import PageContainer from '@/components/atoms/page-container';
import Section, { SectionHeader } from '@/components/atoms/section';

import ContactForm from './_components/contact-form';

export const metadata: Metadata = {
  description: 'Send me a message!',
  title: 'Contact',
};

const Contact = async () => {
  return (
    <PageContainer className='max-w-3xl'>
      <Section>
        <SectionHeader>
          <DisplayTitle as='h1'>
            LET&apos;S <span className='text-content-tertiary'>TALK</span>
          </DisplayTitle>
          <BodyText>
            Have a project in mind? Want to collaborate on something cool? Or
            just want to say hi? Drop me a message below.
          </BodyText>
        </SectionHeader>

        <ContactForm />
      </Section>
    </PageContainer>
  );
};

export default Contact;
