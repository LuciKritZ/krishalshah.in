'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const StatusIndicator = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          hour12: true,
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Kolkata',
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      className='absolute bottom-12 right-12 z-20 hidden flex-col items-end gap-3 lg:flex'
      initial={{ opacity: 0, x: 20 }}
      transition={{ delay: 1.5, duration: 1 }}
    >
      <div className='flex items-center gap-3'>
        <span className='micro-text text-content-tertiary'>
          <a
            className='group/link relative transition-colors duration-300 hover:text-brand'
            href='https://useperry.com'
            rel='noopener noreferrer'
            target='_blank'
          >
            Available
            <span className='absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-brand transition-transform duration-300 group-hover/link:origin-left group-hover/link:scale-x-100' />
          </a>
        </span>
        <div className='relative'>
          <div className='h-1.5 w-1.5 animate-pulse rounded-full bg-brand' />
          <div className='absolute inset-0 animate-pulse rounded-full bg-brand opacity-50 blur-xs' />
        </div>
      </div>
      <div className='flex flex-col items-end'>
        <div className='font-display tabular-nums text-3xl font-bold tracking-tighter text-content-secondary'>
          {time}
        </div>
        <div className='micro-text mt-1 text-content-tertiary opacity-70'>
          IST — Gujarat, India
        </div>
      </div>
      <div className='mt-2 h-px w-12 bg-border' />
      <div className='micro-text text-brand'>Namaste 🙏</div>
    </motion.div>
  );
};

export default StatusIndicator;
