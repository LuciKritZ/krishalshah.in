'use client';

import { HTMLAttributes, ReactNode, useState } from 'react';

import { MenuIcon } from 'lucide-react';
import { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';

import EventButton from '@/components/event-button';
import EventLink from '@/components/event-link';
import Logo from '@/components/logo';
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
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <EventButton
          className='w-10 px-0 sm:hidden'
          eventName='Clicked on Menu - Sidebar'
          variant='outline'
        >
          <MenuIcon className='size-4' />
          <span className='sr-only'>Menu Icon for Sidebar</span>
        </EventButton>
      </SheetTrigger>

      <SheetContent side='right'>
        <SheetTitle>
          <Logo
            className='flex items-center'
            onClick={() => {
              onLinkClick?.('/');
              setOpen(false);
            }}
          />
        </SheetTitle>
        <SheetDescription>{siteConfig.loadingTexts[0]}</SheetDescription>

        <div className='flex flex-col gap-3 mt-3 capitalize'>
          {isAdmin
            ? ADMIN_NAVIGATION_OPTIONS.map(({ href, name }) => (
                <SmLink
                  callBack={onLinkClick}
                  className={cn(currentPath === href ? 'text-primary' : '')}
                  href={href}
                  key={name}
                  name={name}
                  onOpenChange={setOpen}
                >
                  {name}
                </SmLink>
              ))
            : null}

          <EventLink
            eventName='Clicked on Resume Link from Sidebar'
            eventProps={{
              'Resume Link': siteConfig.resumeDoc,
            }}
            href={siteConfig.resumeDoc}
            target='_blank'
          >
            Resume
          </EventLink>

          {NAVIGATION_OPTIONS.map(({ href, name }) => (
            <SmLink
              callBack={onLinkClick}
              className={cn(currentPath === name ? 'text-primary' : '')}
              href={href}
              key={name}
              name={name}
              onOpenChange={setOpen}
            >
              {name}
            </SmLink>
          ))}

          {siteConfig.socialLinks.map(({ title, link }) => (
            <SmLink href={link} key={link} onOpenChange={setOpen}>
              {title}
            </SmLink>
          ))}

          <EventLink
            eventName='Clicked on RSS link from Sidebar'
            href='/rss'
            target='_blank'
          >
            RSS
          </EventLink>

          {/* Show login and logout buttons in future */}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SmNav;

interface SmLinkProps extends LinkProps {
  callBack?: NavProps['onLinkClick'];
  children: ReactNode;
  className?: HTMLAttributes<HTMLDivElement>['className'];
  name?: string;
  onOpenChange?: (isOpen: boolean) => void;
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
    <EventLink
      className={className}
      eventName={`Clicked on ${name} option from Sidebar`}
      href={href}
      onClick={() => {
        router.push(href.toString());
        callBack?.(name ?? '');
        onOpenChange?.(false);
      }}
      {...rest}
    >
      {children}
    </EventLink>
  );
};
