'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import Logo from '@/components/logo';
import ToggleTheme from '@/components/toggle-theme';

import MdNav from './nav/md-nav';
import SiteActions from './nav/site-actions';
import SmNav from './nav/sm-nav';

export interface NavProps {
  currentPath: string;
  onLinkClick: Dispatch<SetStateAction<string>>;
  isAdmin?: boolean;
}

const Header = () => {
  const [currentLink, setCurrentLink] = useState<string>(
    global?.window.location.pathname?.split('/')[1]
  );
  const data = { user: { isAdmin: false } };

  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-background/75 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-14'>
      <nav className='container flex max-w-3xl items-center justify-between h-[40px]'>
        <Logo onClick={() => setCurrentLink('/')} />

        <MdNav
          currentPath={currentLink}
          onLinkClick={setCurrentLink}
          isAdmin={data?.user.isAdmin}
        />

        <div className='flex sm:flex-row items-center justify-end gap-2 flex-row-reverse'>
          <SmNav
            currentPath={currentLink}
            onLinkClick={setCurrentLink}
            isAdmin={data?.user.isAdmin}
          />
          <ToggleTheme />
          <SiteActions />
        </div>
      </nav>
    </header>
  );
};

export default Header;
