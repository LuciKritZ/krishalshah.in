'use client';

import { siteConfig } from '@/config';
import { cn } from '@/lib/utils';

import SocialLink from './social-link';

interface SocialDockProps {
  className?: string;
}

const SocialDock = ({ className }: SocialDockProps) => (
  <div
    className={cn(
      'absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl md:hidden',
      className
    )}
  >
    {siteConfig.socialLinks.map(props => (
      <SocialLink
        key={props._id}
        {...props}
        className='block p-3 text-content-tertiary transition-colors hover:text-brand [&>span]:sr-only [&_svg]:size-[18px]'
      />
    ))}
  </div>
);

export default SocialDock;
