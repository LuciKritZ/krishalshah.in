'use client';

import { useEffect, useRef, useState } from 'react';

import { Menu } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import MobileMenuDrawer from './mobile-menu-drawer';
import type { NavLinkItem } from './nav-link';
import NavLink from './nav-link';

const DEFAULT_LINKS: NavLinkItem[] = [
  { href: '#work', name: 'Work', type: 'anchor' },
  { href: '#contact', name: 'Contact', type: 'anchor' },
  { href: '/experience', name: 'Experience', type: 'link' },
  { href: '/projects', name: 'Projects', type: 'link' },
  { href: '/posts', name: 'Blog', type: 'link' },
];

interface SiteHeaderProps {
  adminHref?: string;
  isAdmin?: boolean;
  links?: NavLinkItem[];
  logoHref?: string;
  showThemeToggle?: boolean;
  themeToggle?: React.ReactNode;
}

const SiteHeader = ({
  links = DEFAULT_LINKS,
  logoHref = '/',
  isAdmin = false,
  adminHref = '/_admin',
  showThemeToggle = true,
  themeToggle,
}: SiteHeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [elevated, setElevated] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const isScrollingDown = currentY > lastScrollY.current;
      const pastHideThreshold = currentY > 80;

      setHidden(isScrollingDown && pastHideThreshold);
      setElevated(currentY > 8);
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          'fixed inset-x-0 top-0 z-40 border-b',
          'transition-transform duration-500',
          elevated
            ? 'border-border bg-surface/80 backdrop-blur-xl'
            : 'border-transparent bg-transparent',
          hidden ? '-translate-y-full' : 'translate-y-0'
        )}
      >
        <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:py-4'>
          <Link
            className='flex items-center font-display text-2xl font-bold tracking-tight text-content-primary md:text-3xl'
            href={logoHref}
          >
            <span className='mt-2 font-rage text-2xl leading-none text-brand md:text-4xl'>
              Krishal
            </span>
          </Link>

          <div className='hidden text-[10px] font-bold uppercase tracking-[0.3em] md:flex md:items-center md:gap-8'>
            {isAdmin && (
              <Link
                className='text-content-tertiary transition-colors hover:text-brand'
                href={adminHref}
              >
                Admin
              </Link>
            )}
            {links.map(item => (
              <NavLink
                activeClassName='text-brand'
                className='text-content-primary/80 hover:text-brand'
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
              className='text-content-primary transition-colors hover:text-brand'
              onClick={() => setMobileOpen(true)}
              type='button'
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenuDrawer
        adminHref={adminHref}
        isAdmin={isAdmin}
        links={links}
        onClose={() => setMobileOpen(false)}
        open={mobileOpen}
      />
    </>
  );
};

export default SiteHeader;
