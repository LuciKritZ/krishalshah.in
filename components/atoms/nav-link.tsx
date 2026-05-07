'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

export interface NavLinkItem {
  href: string;
  name: string;
  type: 'anchor' | 'link';
}

interface NavLinkProps {
  activeClassName?: string;
  className?: string;
  eventName?: string;
  item: NavLinkItem;
  onClick?: () => void;
}

const NavLink = ({
  activeClassName,
  className,
  eventName,
  item,
  onClick,
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = item.type === 'link' && pathname === item.href;

  const baseClass = cn(
    'text-[10px] font-bold uppercase tracking-[0.3em] transition-colors hover:text-brand',
    isActive && activeClassName,
    className
  );

  const track = () => {
    if (eventName) trackEvent(eventName, { link: item.name });
    onClick?.();
  };

  if (item.type === 'anchor') {
    return (
      <a className={baseClass} href={item.href} onClick={track}>
        {item.name}
      </a>
    );
  }

  return (
    <Link className={baseClass} href={item.href} onClick={track}>
      {item.name}
    </Link>
  );
};

export default NavLink;
