import SocialLink from '@/components/social-link';
import { siteConfig } from '@/config';

import NewsLetterForm from './_components/newsletter-form';
import Introduction from './_sections/introduction';
import RecentPosts from './_sections/recent-posts';

/**
 * @see https://github.com/vercel/next.js/discussions/58936#discussioncomment-7701179
 */
export const dynamic = 'force-dynamic';

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
