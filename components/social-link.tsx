'use client';

import { siteConfig } from '@/config';

import EventLink from './event-link';

type SocialLinkProps = (typeof siteConfig.socialLinks)[0];

const SocialLink = ({ link, icon, title }: SocialLinkProps) => (
  <EventLink
    className='block w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]'
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
