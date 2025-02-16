'use client';

import { siteConfig } from '@/config';

import EventLink from './event-link';

type SocialLinkProps = (typeof siteConfig.socialLinks)[0];

const SocialLink = ({ link, icon, title }: SocialLinkProps) => (
  <EventLink
    eventName='Clicked on Social Link'
    eventProps={{
      'Social Link': title,
    }}
    href={link}
    target='_blank'
    referrerPolicy='no-referrer'
    className='block w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]'
  >
    <span className='sr-only'>{title}</span>
    {icon}
  </EventLink>
);

export default SocialLink;
