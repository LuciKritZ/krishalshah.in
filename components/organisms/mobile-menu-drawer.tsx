'use client';

import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import type { NavLinkItem } from '@/components/atoms/nav-link';

import SocialLink from '@/components/atoms/social-link';
import { siteConfig } from '@/config';
import { cn } from '@/lib/utils';

const drawerSpring = {
  damping: 25,
  stiffness: 200,
  type: 'spring' as const,
};

interface MobileMenuDrawerProps {
  links: NavLinkItem[];
  onClose: () => void;
  open: boolean;
}

const MobileMenuDrawer = ({ links, onClose, open }: MobileMenuDrawerProps) => {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) {
      return;
    }

    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = '';
      }}
    >
      {open ? (
        <motion.button
          animate={{ opacity: 1 }}
          aria-label='Close menu'
          className='fixed inset-0 z-90 cursor-pointer bg-background/40 backdrop-blur-xl md:hidden'
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          key='mobile-drawer-backdrop'
          onClick={onClose}
          transition={{ duration: 0.2 }}
          type='button'
        />
      ) : null}
      {open ? (
        <motion.div
          animate={{ x: 0 }}
          aria-label='Navigation menu'
          aria-modal='true'
          className='fixed top-0 right-0 bottom-0 z-100 flex w-[80%] max-w-sm flex-col border-l border-border bg-background/80 p-10 backdrop-blur-xl md:hidden'
          exit={{ x: '100%' }}
          initial={{ x: '100%' }}
          key='mobile-drawer-panel'
          role='dialog'
          transition={drawerSpring}
        >
          <div className='mb-16 flex items-center justify-between'>
            <span className='font-display text-xl font-bold tracking-tighter text-content-primary'>
              MENU
            </span>
            <button
              aria-label='Close menu'
              className='text-content-primary transition-colors hover:text-brand'
              onClick={onClose}
              type='button'
            >
              <X size={24} />
            </button>
          </div>

          <nav className='flex flex-col gap-6'>
            {links.map(link =>
              link.type === 'anchor' ? (
                <a
                  className='font-display text-3xl font-bold tracking-tight text-content-primary transition-colors hover:text-brand'
                  href={link.href}
                  key={link.name}
                  onClick={onClose}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  className={cn(
                    'font-display text-3xl font-bold tracking-tight transition-colors hover:text-brand',
                    pathname === link.href
                      ? 'text-brand'
                      : 'text-content-primary'
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

          <div className='mt-auto flex gap-6 pt-10'>
            {siteConfig.socialLinks.map(props => (
              <SocialLink
                key={props._id}
                {...props}
                className='block text-content-primary/20 transition-colors hover:text-brand [&>span]:sr-only [&_svg]:size-5'
              />
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default MobileMenuDrawer;
