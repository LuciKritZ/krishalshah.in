import EventLink from '@/components/event-link';
import {
  ADMIN_NAVIGATION_OPTIONS,
  NAVIGATION_OPTIONS,
  siteConfig,
} from '@/config';
import { cn } from '@/lib/utils';

import { NavProps } from '../header';

const MdNav = ({ currentPath, isAdmin = false }: NavProps) => (
  <ul className='hidden sm:flex items-center gap-6 text-sm font-normal text-muted-foreground'>
    {isAdmin
      ? ADMIN_NAVIGATION_OPTIONS.map(({ href, name }) => (
          <li
            className={cn(
              'transition-colors duration-100 ease-linear hover:text-primary capitalize',
              name === currentPath ? 'text-foreground' : ''
            )}
            key={name}
          >
            <EventLink
              eventName={`Clicked on ${name} option from Navbar - Admin Options`}
              href={href}
            >
              {name}
            </EventLink>
          </li>
        ))
      : null}

    <li>
      <EventLink
        eventName='Clicked on Resume Link from Navbar'
        eventProps={{
          'Resume Link': siteConfig.resumeDoc,
        }}
        href={siteConfig.resumeDoc}
        target='_blank'
      >
        Resume
      </EventLink>
    </li>

    {NAVIGATION_OPTIONS.map(({ href, name }) => (
      <li
        className={cn(
          'transition-colors duration-100 ease-linear hover:text-primary capitalize',
          href === currentPath ? 'text-foreground' : ''
        )}
        key={name}
      >
        <EventLink
          eventName={`Clicked on ${name} option from Navbar`}
          href={href}
        >
          {name}
        </EventLink>
      </li>
    ))}
  </ul>
);

export default MdNav;
