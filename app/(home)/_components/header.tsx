'use client';

import { Dispatch, SetStateAction } from 'react';

import { usePathname } from 'next/navigation';

import Logo from '@/components/logo';
import ToggleTheme from '@/components/toggle-theme';

import MdNav from './nav/md-nav';
import SiteActions from './nav/site-actions';
import SmNav from './nav/sm-nav';

export interface NavProps {
  currentPath: string;
  onLinkClick?: Dispatch<SetStateAction<string>>;
  isAdmin?: boolean;
}

const Header = () => {
  const pathname = usePathname();
  const data = { user: { isAdmin: false } };

  return (
    <header className='fixed inset-x-0 top-0 z-50 py-3 h-14 header-bg'>
      <nav className='container flex max-w-3xl items-center justify-between h-[40px]'>
        <Logo />

        <MdNav currentPath={pathname} isAdmin={data?.user.isAdmin} />

        <div className='flex sm:flex-row items-center justify-end gap-2 flex-row-reverse'>
          <SmNav currentPath={pathname} isAdmin={data?.user.isAdmin} />
          <ToggleTheme />
          <SiteActions />
        </div>
      </nav>
    </header>
  );
};

export default Header;
