'use client';

import { siteConfig } from '@/config';
import { cn } from '@/lib/utils';

import SocialLink from './social-link';

interface SocialRailProps {
  className?: string;
}

const SocialRail = ({ className }: SocialRailProps) => (
  <div
    className={cn(
      'absolute bottom-0 left-12 z-20 hidden md:flex flex-col items-center',
      className
    )}
  >
    <div className='mb-10 flex flex-col gap-10'>
      {siteConfig.socialLinks.map((props, i) => (
        <div
          className='group relative flex items-center'
          key={props._id}
          style={{ animationDelay: `${1.2 + i * 0.1}s` }}
        >
          <SocialLink
            {...props}
            className='relative z-10 flex items-center rounded-sm border border-white/5 bg-surface p-2.5 transition-all duration-500 group-hover:border-brand/40 [&>span]:sr-only [&_svg]:size-4 [&_svg]:text-content-primary/20 [&_svg]:transition-colors [&_svg]:duration-500 group-hover:[&_svg]:text-content-primary lg:[&_svg]:size-5'
          />
          <div className='pointer-events-none absolute left-full ml-4 flex items-center'>
            <div className='h-px w-0 bg-brand/30 transition-all duration-500 ease-out group-hover:w-8' />
            <span className='ml-0 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.6em] text-content-primary/0 transition-all duration-500 group-hover:ml-4 group-hover:text-brand'>
              {props.title}
            </span>
          </div>
        </div>
      ))}
    </div>
    <div
      aria-hidden
      className='h-[120px] w-px bg-linear-to-b from-white/10 via-white/5 to-transparent'
    />
  </div>
);

export default SocialRail;
