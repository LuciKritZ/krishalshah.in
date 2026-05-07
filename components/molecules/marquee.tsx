'use client';

import { type AnimationPlaybackControls, useAnimate } from 'motion/react';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  pauseOnHover?: boolean;
}

const Marquee = ({
  children,
  className,
  duration = 40,
  pauseOnHover = true,
}: MarqueeProps) => {
  const [scope, animate] = useAnimate();
  const controls = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    controls.current = animate(
      scope.current,
      { x: ['0%', '-50%'] },
      {
        duration,
        ease: 'linear',
        repeat: Infinity,
      }
    );

    return () => controls.current?.stop();
  }, [animate, duration, scope]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      controls.current?.pause();
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      controls.current?.play();
    }
  };

  return (
    <div
      className='flex w-full overflow-hidden'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={cn('flex w-max shrink-0 items-center', className)}
        ref={scope}
      >
        <div className='flex items-center gap-ui-xl pr-ui-xl md:gap-ui-2xl md:pr-ui-2xl'>
          {children}
        </div>
        <div className='flex items-center gap-ui-xl pr-ui-xl md:gap-ui-2xl md:pr-ui-2xl'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
