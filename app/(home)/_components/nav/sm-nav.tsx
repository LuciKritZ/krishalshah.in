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
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { NAVIGATION_OPTIONS, siteConfig } from '@/config';

const SmNav = () => {
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
          <SmLink onOpenChange={setOpen} href='/' className='flex items-center'>
            <Logo />
          </SmLink>
        </SheetTitle>

        <div className='flex flex-col gap-3 mt-3 capitalize'>
          <Link href={siteConfig.resumeDoc} target='_blank'>
            Resume
          </Link>
          {NAVIGATION_OPTIONS.map(({ href, name }) => (
            <SmLink href={href} key={name} onOpenChange={setOpen}>
              {name}
            </SmLink>
          ))}

          {siteConfig.socialLinks.map(({ title, link }) => (
            <SmLink href={link} key={link} onOpenChange={setOpen}>
              {title}
            </SmLink>
          ))}
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
}

const SmLink = ({
  href,
  onOpenChange,
  children,
  className,
  ...rest
}: SmLinkProps) => {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={className}
      {...rest}
    >
      {children}
    </Link>
  );
};
