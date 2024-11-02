import { Fira_Code } from 'next/font/google';
import Link from 'next/link';

import { siteConfig } from '@/config';
import { cn } from '@/lib/utils';

const firaCode = Fira_Code({ subsets: ['latin'] });

const Logo = () => (
  <Link href='/' className={cn(firaCode.className)}>
    {siteConfig.name}
  </Link>
);

export default Logo;
