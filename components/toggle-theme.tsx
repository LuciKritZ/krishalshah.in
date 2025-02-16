'use client';

import { useEffect, useState } from 'react';

import { Loader, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import EventButton from './event-button';
import { Button } from './ui/button';

const LoaderIcon = () => (
  <Button size='sm' variant='link' disabled className='p-0'>
    <Loader className='size-4' />
  </Button>
);

const ToggleTheme = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <LoaderIcon />;
  }

  return (
    <EventButton
      size='sm'
      variant='link'
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className='p-0'
      eventName={`Clicked on Toggle Theme - ${resolvedTheme === 'dark' ? 'light' : 'dark'}`}
    >
      {resolvedTheme === 'dark' ? (
        <SunIcon className='size-4 text-orange-300' />
      ) : (
        <MoonIcon className='size-4 text-sky-950' />
      )}

      <span className='sr-only'>Toggle theme</span>
    </EventButton>
  );
};

export default ToggleTheme;
