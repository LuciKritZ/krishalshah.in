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
    className={cn(firaCode.className, className)}
    eventName='Clicked on Logo'
    href='/'
    {...props}
  >
    <span>{siteConfig.name}</span>
  </EventLink>
);

export default Logo;
