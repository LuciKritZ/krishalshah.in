'use client';

import { useState } from 'react';

import { Menu } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import MobileNavDrawer from './mobile-nav-drawer';
import type { NavLinkItem } from './nav-link';
import NavLink from './nav-link';

const DEFAULT_LINKS: NavLinkItem[] = [
  { href: '#work', name: 'Work', type: 'anchor' },
  { href: '#contact', name: 'Contact', type: 'anchor' },
  { href: '/experience', name: 'Experience', type: 'link' },
  { href: '/projects', name: 'Projects', type: 'link' },
  { href: '/posts', name: 'Blog', type: 'link' },
];

interface TectonicNavProps {
  adminHref?: string;
  isAdmin?: boolean;
  links?: NavLinkItem[];
  logoHref?: string;
  showThemeToggle?: boolean;
  themeToggle?: React.ReactNode;
}

const TectonicNav = ({
  links = DEFAULT_LINKS,
  logoHref = '/',
  isAdmin = false,
  adminHref = '/_admin',
  showThemeToggle = true,
  themeToggle,
}: TectonicNavProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = [...links];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-8 transition-all duration-500',
          'bg-transparent'
        )}
      >
        <Link
          className='flex h-10 origin-left items-center font-display text-3xl font-bold tracking-tighter text-white md:text-4xl'
          href={logoHref}
        >
          <span className='font-rage'>K</span>
          <span className='-mt-2'>.</span>
          <span className='text-tectonic'>Shah</span>
        </Link>

        <div className='hidden md:flex md:items-center md:gap-8'>
          {isAdmin && (
            <Link
              className='text-[10px] font-bold uppercase tracking-[0.3em] text-white/90 transition-colors hover:text-tectonic'
              href={adminHref}
            >
              Admin
            </Link>
          )}
          {navLinks.map(item => (
            <NavLink
              activeClassName='text-tectonic'
              className='text-white/90'
              item={item}
              key={item.name}
            />
          ))}
          {showThemeToggle && themeToggle}
        </div>

        <div className='flex items-center gap-2 md:hidden'>
          {showThemeToggle && themeToggle}
          <button
            aria-label='Open menu'
            className='text-white transition-colors hover:text-tectonic'
            onClick={() => setMobileOpen(true)}
            type='button'
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <MobileNavDrawer
        links={navLinks}
        onClose={() => setMobileOpen(false)}
        open={mobileOpen}
      />
    </>
  );
};

export default TectonicNav;
