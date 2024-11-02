'use client';

import Link from 'next/link';

import { siteConfig } from '@/config';

type SocialLinkProps = (typeof siteConfig.socialLinks)[0];

const SocialLink = ({ link, icon, title }: SocialLinkProps) => (
  <Link
    href={link}
    target='_blank'
    referrerPolicy='no-referrer'
    className='block w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]'
  >
    <span className='sr-only'>{title}</span>
    {icon}
  </Link>
);

export default SocialLink;
