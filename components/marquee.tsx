'use client';

import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  pauseOnHover?: boolean;
}

const Marquee = ({
  children,
  className,
  pauseOnHover = true,
}: MarqueeProps) => (
  <div
    className={cn(
      'flex gap-12 md:gap-20 items-center whitespace-nowrap animate-marquee',
      pauseOnHover && 'pause-on-hover',
      className
    )}
  >
    {children}
  </div>
);

export default Marquee;
