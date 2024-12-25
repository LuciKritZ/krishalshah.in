'use client';

import { HTMLAttributes, ReactNode, useState } from 'react';

import { MenuIcon } from 'lucide-react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';

import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  ADMIN_NAVIGATION_OPTIONS,
  NAVIGATION_OPTIONS,
  siteConfig,
} from '@/config';
import { cn } from '@/lib/utils';

import { NavProps } from '../header';

const SmNav = ({ currentPath, onLinkClick, isAdmin = false }: NavProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='outline' className='w-10 px-0 sm:hidden'>
          <MenuIcon className='size-4' />
          <span className='sr-only'>Toggle Theme</span>
        </Button>
      </SheetTrigger>

      <SheetContent side='right'>
        <SheetTitle>
          <Logo
            onClick={() => {
              onLinkClick?.('/');
              setOpen(false);
            }}
            className='flex items-center'
          />
        </SheetTitle>
        <SheetDescription>{siteConfig.loadingTexts[0]}</SheetDescription>

        <div className='flex flex-col gap-3 mt-3 capitalize'>
          {isAdmin
            ? ADMIN_NAVIGATION_OPTIONS.map(({ href, name }) => (
                <SmLink
                  href={href}
                  key={name}
                  onOpenChange={setOpen}
                  callBack={onLinkClick}
                  name={name}
                  className={cn(currentPath === href ? 'text-primary' : '')}
                >
                  {name}
                </SmLink>
              ))
            : null}

          <Link href={siteConfig.resumeDoc} target='_blank'>
            Resume
          </Link>

          {NAVIGATION_OPTIONS.map(({ href, name }) => (
            <SmLink
              href={href}
              key={name}
              onOpenChange={setOpen}
              callBack={onLinkClick}
              name={name}
              className={cn(currentPath === name ? 'text-primary' : '')}
            >
              {name}
            </SmLink>
          ))}

          {siteConfig.socialLinks.map(({ title, link }) => (
            <SmLink href={link} key={link} onOpenChange={setOpen}>
              {title}
            </SmLink>
          ))}

          <Link href='/rss' target='_blank'>
            RSS
          </Link>

          {/* Show login and logout buttons in future */}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SmNav;

interface SmLinkProps extends LinkProps {
  children: ReactNode;
  onOpenChange?: (isOpen: boolean) => void;
  className?: HTMLAttributes<HTMLDivElement>['className'];
  callBack?: NavProps['onLinkClick'];
  name?: string;
}

const SmLink = ({
  href,
  onOpenChange,
  children,
  className,
  callBack,
  name,
  ...rest
}: SmLinkProps) => {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        callBack?.(name ?? '');
        onOpenChange?.(false);
      }}
      className={className}
      {...rest}
    >
      {children}
    </Link>
  );
};
