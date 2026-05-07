'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import NavLink from '@/components/atoms/nav-link';
import { NAVIGATION_OPTIONS } from '@/config';
import { cn } from '@/lib/utils';

import MobileMenuDrawer from './mobile-menu-drawer';

interface SiteHeaderProps {
  logoHref?: string;
  showThemeToggle?: boolean;
  themeToggle?: React.ReactNode;
}

const SiteHeader = ({
  logoHref = '/',
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
            className='font-rage flex h-[40px] text-3xl font-bold tracking-tighter text-content-primary md:text-4xl'
            href={logoHref}
          >
            <div className='flex py-2'>
              <span>K</span>
              <span className='-mt-2'>.</span>
              <div className='text-brand'>Shah</div>
            </div>
          </Link>

          <div className='hidden text-[10px] font-bold uppercase tracking-[0.3em] md:flex md:items-center md:gap-8'>
            {NAVIGATION_OPTIONS.map(item => (
              <NavLink
                activeClassName='text-brand'
                className='text-content-primary/80 hover:text-brand'
                item={item}
                key={item.name}
              />
            ))}
            {showThemeToggle && themeToggle}
          </div>

          <div className='flex items-center gap-4 md:hidden'>
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
        links={NAVIGATION_OPTIONS}
        onClose={() => setMobileOpen(false)}
        open={mobileOpen}
      />
    </>
  );
};

export default SiteHeader;
