import { Fira_Code } from 'next/font/google';
import Link, { LinkProps } from 'next/link';

import { siteConfig } from '@/config';
import { cn } from '@/lib/utils';

const firaCode = Fira_Code({ subsets: ['latin'] });

const Logo = ({
  className = '',
  ...props
}: Omit<
  LinkProps & { className?: HTMLAnchorElement['className'] },
  'href'
>) => (
  <Link href='/' className={cn(firaCode.className, className)} {...props}>
    <span>{siteConfig.name}</span>
  </Link>
);

export default Logo;
