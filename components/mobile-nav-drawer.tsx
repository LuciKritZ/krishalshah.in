'use client';

import { useEffect } from 'react';

import { X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { siteConfig } from '@/config';
import { cn } from '@/lib/utils';

import type { NavLinkItem } from './nav-link';
import SocialLink from './social-link';

interface MobileNavDrawerProps {
  links: NavLinkItem[];
  onClose: () => void;
  open: boolean;
}

const MobileNavDrawer = ({ open, onClose, links }: MobileNavDrawerProps) => {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
      document.addEventListener('keydown', handler);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handler);
        document.body.style.overflow = '';
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <button
        aria-label='Close menu'
        className='fixed inset-0 z-50 bg-obsidian/80 backdrop-blur-sm md:hidden'
        onClick={onClose}
        type='button'
      />
      <div
        aria-label='Navigation menu'
        aria-modal='true'
        className='fixed top-0 right-0 bottom-0 z-60 flex w-[80%] max-w-sm flex-col border-l border-white/5 bg-slab p-10 md:hidden'
        role='dialog'
      >
        <div className='mb-16 flex items-center justify-between'>
          <span className='font-display text-xl font-bold tracking-tighter text-white'>
            MENU
          </span>
          <button
            aria-label='Close menu'
            className='text-white transition-colors hover:text-tectonic'
            onClick={onClose}
            type='button'
          >
            <X size={24} />
          </button>
        </div>

        <nav className='flex flex-col gap-8'>
          {links.map(link =>
            link.type === 'anchor' ? (
              <a
                className='font-display text-3xl font-bold tracking-tight text-white transition-colors hover:text-tectonic'
                href={link.href}
                key={link.name}
                onClick={onClose}
              >
                {link.name}
              </a>
            ) : (
              <Link
                className={cn(
                  'font-display text-3xl font-bold tracking-tight transition-colors hover:text-tectonic',
                  pathname === link.href ? 'text-tectonic' : 'text-white'
                )}
                href={link.href}
                key={link.name}
                onClick={onClose}
              >
                {link.name}
              </Link>
            )
          )}
        </nav>

        <div className='mt-auto flex gap-6 border-t border-white/5 pt-10'>
          {siteConfig.socialLinks.map(props => (
            <SocialLink
              key={props._id}
              {...props}
              className='block text-white/20 transition-colors hover:text-tectonic [&>span]:sr-only [&_svg]:size-5'
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileNavDrawer;
