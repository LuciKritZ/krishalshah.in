import { Fira_Code } from 'next/font/google';
import { LinkProps } from 'next/link';

import { siteConfig } from '@/config';
import { cn } from '@/lib/utils';

import EventLink from './event-link';

const firaCode = Fira_Code({ subsets: ['latin'] });

const Logo = ({
  className = '',
  ...props
}: Omit<
  LinkProps & { className?: HTMLAnchorElement['className'] },
  'href'
>) => (
  <EventLink
    eventName='Clicked on Logo'
    href='/'
    className={cn(firaCode.className, className)}
    {...props}
  >
    <span>{siteConfig.name}</span>
  </EventLink>
);

export default Logo;
