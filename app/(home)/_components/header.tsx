'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import { Rss } from 'lucide-react';
import Link from 'next/link';

import Logo from '@/components/logo';
import ToggleTheme from '@/components/toggle-theme';

import MdNav from './nav/md-nav';
import SmNav from './nav/sm-nav';

export interface NavProps {
  currentPath: string;
  onLinkClick: Dispatch<SetStateAction<string>>;
}

const Header = () => {
  const [currentLink, setCurrentLink] = useState<string>(
    window.location.pathname?.split('/')[1]
  );
  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-background/75 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-14'>
      <nav className='container flex max-w-3xl items-center justify-between h-[40px]'>
        <Logo onClick={() => setCurrentLink('/')} />

        <MdNav currentPath={currentLink} onLinkClick={setCurrentLink} />

        <div className='flex items-center justify-end'>
          <SmNav currentPath={currentLink} onLinkClick={setCurrentLink} />
          <ToggleTheme />
          <Link href='/rss' target='_blank'>
            <Rss className='size-4' />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
