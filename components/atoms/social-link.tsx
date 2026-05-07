'use client';

import { siteConfig } from '@/config';
import { cn } from '@/lib/utils';

import EventLink from './event-link';

type SocialLinkProps = (typeof siteConfig.socialLinks)[0] & {
  className?: string;
};

const SocialLink = ({ className, icon, link, title }: SocialLinkProps) => (
  <EventLink
    className={cn('block transition-all duration-300', className)}
    eventName='Clicked on Social Link'
    eventProps={{
      'Social Link': title,
    }}
    href={link}
    referrerPolicy='no-referrer'
    target='_blank'
  >
    <span className='sr-only'>{title}</span>
    {icon}
  </EventLink>
);

export default SocialLink;
