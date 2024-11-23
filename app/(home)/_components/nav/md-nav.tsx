import Link from 'next/link';

import { NAVIGATION_OPTIONS, siteConfig } from '@/config';
import { cn } from '@/lib/utils';

import { NavProps } from '../header';

const MdNav = ({ currentPath, onLinkClick }: NavProps) => {
  return (
    <ul className='hidden sm:flex items-center gap-6 text-sm font-normal text-muted-foreground'>
      <li>
        <Link href={siteConfig.resumeDoc} target='_blank'>
          Resume
        </Link>
      </li>
      {NAVIGATION_OPTIONS.map(({ href, name }) => (
        <li
          key={name}
          className={cn(
            'transition-colors duration-100 ease-linear hover:text-primary capitalize',
            name === currentPath ? 'text-foreground' : ''
          )}
          onClick={() => onLinkClick(name)}
        >
          <Link href={href}>{name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default MdNav;
