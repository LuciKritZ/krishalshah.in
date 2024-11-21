import { Fira_Code } from 'next/font/google';
import Link, { LinkProps } from 'next/link';

import { siteConfig } from '@/config';
import { cn } from '@/lib/utils';

const firaCode = Fira_Code({ subsets: ['latin'] });

const Logo = ({ ...props }: Omit<LinkProps, 'href'>) => (
  <Link href='/' className={cn(firaCode.className)} {...props}>
    {siteConfig.name}
  </Link>
);

export default Logo;
