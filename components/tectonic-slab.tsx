'use client';

import { useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface TectonicSlabProps {
  children: React.ReactNode;
  className?: string;
}

const TectonicSlab = ({ children, className }: TectonicSlabProps) => {
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
        'tectonic-border bg-slab p-5 md:p-8 rounded-sm slab-shadow group flex flex-col h-full relative',
        className
      )}
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      <div
        aria-hidden
        className='absolute top-0 right-0 w-32 h-32 bg-tectonic/5 blur-[100px] rounded-full -mr-16 -mt-16 group-hover:bg-tectonic/8 transition-all duration-700 pointer-events-none'
      />
      <div
        aria-hidden
        className='tectonic-glow'
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
      <div className='relative z-10 flex flex-col h-full'>{children}</div>
      <div
        aria-hidden
        className='absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-tectonic/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700'
      />
    </div>
  );
};

export default TectonicSlab;
