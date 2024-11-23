import { Metadata } from 'next';

import ContactForm from './_components/contact-form';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Send me a message!',
};

const Contact = async () => {
  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <h2 className='title'>Let&apos;s talk about your project!</h2>

        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
