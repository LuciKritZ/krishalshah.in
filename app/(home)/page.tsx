import SocialLink from '@/components/social-link';
import { siteConfig } from '@/config';

import NewsLetterForm from './_components/newsletter-form';
import Introduction from './_sections/introduction';
import RecentPosts from './_sections/recent-posts';

const Home = async () => (
  <section className='py-24'>
    <div className='container max-w-3xl'>
      <Introduction />

      <div className='flex mt-12 space-x-6 justify-center'>
        {siteConfig.socialLinks.map((socialLinkProps) => (
          <SocialLink key={socialLinkProps._id} {...socialLinkProps} />
        ))}
      </div>

      <RecentPosts />

      <NewsLetterForm />
    </div>
  </section>
);

export default Home;
