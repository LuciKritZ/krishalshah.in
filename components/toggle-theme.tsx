'use client';

import { useEffect, useState } from 'react';

import { Loader, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import EventButton from './event-button';
import { Button } from './ui/button';

const LoaderIcon = () => (
  <Button className='p-0' disabled size='sm' variant='link'>
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
      className='p-0'
      eventName={`Clicked on Toggle Theme - ${resolvedTheme === 'dark' ? 'light' : 'dark'}`}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      size='sm'
      variant='link'
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
