import Link from 'next/link';

import { NAVIGATION_OPTIONS, siteConfig } from '@/config';

const MdNav = () => (
  <ul className='hidden sm:flex items-center gap-6 text-sm font-normal text-muted-foreground'>
    <li>
      <Link href={siteConfig.resumeDoc} target='_blank'>
        Resume
      </Link>
    </li>
    {NAVIGATION_OPTIONS.map(({ href, name }) => (
      <li
        key={name}
        className='transition-colors hover:text-foreground capitalize'
      >
        <Link href={href}>{name}</Link>
      </li>
    ))}
  </ul>
);

export default MdNav;
