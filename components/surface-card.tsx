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
        'surface-card group relative flex h-full flex-col rounded-sm bg-surface-secondary p-5 surface-elevated-shadow md:p-8',
        className
      )}
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      <div
        aria-hidden
        className='pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-brand/5 blur-[100px] transition-all duration-700 group-hover:bg-brand/8'
      />
      <div
        aria-hidden
        className='surface-card-glow'
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
      <div className='relative z-10 flex h-full flex-col'>{children}</div>
      <div
        aria-hidden
        className='absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-brand/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100'
      />
    </div>
  );
};

export default SurfaceCard;
