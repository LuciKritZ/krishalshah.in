'use client';

import { cn } from '@/lib/utils';

interface BackToTopProps {
  className?: string;
}

const BackToTop = ({ className }: BackToTopProps) => {
  const scrollToTop = () => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  };

  return (
    <div className={cn('flex flex-col items-center justify-start', className)}>
      <button
        className='cursor-pointer text-content-tertiary hover:text-content-primary flex flex-col items-center gap-4 text-[10px] font-bold tracking-[0.2em] transition-colors group'
        onClick={scrollToTop}
      >
        BACK TO TOP
        <div className='cursor-pointer border-border group-hover:bg-content-primary group-hover:text-background group-hover:border-content-primary flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300'>
          <svg
            className='transition-transform duration-500 group-hover:-translate-y-1'
            fill='none'
            height='16'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            width='16'
          >
            <path d='m18 15-6-6-6 6' />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default BackToTop;
