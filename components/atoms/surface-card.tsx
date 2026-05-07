'use client';

import { useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface SurfaceCardProps {
  children: React.ReactNode;
  className?: string;
}

const SurfaceCard = ({ children, className }: SurfaceCardProps) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div
      className={cn(
        'brand-border group flex h-full flex-col rounded-md bg-surface p-ui-md md:p-ui-xl',
        className
      )}
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      <div
        aria-hidden
        className='brand-glow'
        style={
          {
            '--x': `${mousePos.x}%`,
            '--y': `${mousePos.y}%`,
          } as React.CSSProperties & {
            '--x': string;
            '--y': string;
          }
        }
      />
      <div className='relative z-base flex h-full flex-col'>{children}</div>
    </div>
  );
};

export default SurfaceCard;
