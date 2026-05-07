'use client';

import { useEffect, useState } from 'react';

const FooterClock = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', { timeZoneName: 'short' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className='hover:text-brand hidden font-bold transition-colors duration-300 lg:inline-block'
      suppressHydrationWarning
    >
      {time ||
        new Date().toLocaleTimeString('en-US', { timeZoneName: 'short' })}
    </span>
  );
};

export default FooterClock;
