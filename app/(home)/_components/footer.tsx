import Link from 'next/link';

import SocialLink from '@/components/social-link';
import { siteConfig } from '@/config';

const Footer = () => (
  <footer className='py-8'>
    <div className='container max-w-3xl flex items-center justify-between h-auto flex-col md:flex-row'>
      <div className='flex space-x-6 justify-center'>
        {siteConfig.socialLinks.map((socialLinkProps) => (
          <SocialLink key={socialLinkProps._id} {...socialLinkProps} />
        ))}
      </div>

      <div className='mt-4 md:mt-0 md:order-1 flex items-center'>
        <p className='text-center text-md leading-5 text-muted-foreground text-sm'>
          Made with ♥️ by{' '}
          <Link
            href={siteConfig.links.github}
            target='_blank'
            className='tracking-tighter underline decoration-wavy hover:decoration-primary-foreground transition-colors duration-100 ease-linear'
          >
            Krishal Shah
          </Link>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
