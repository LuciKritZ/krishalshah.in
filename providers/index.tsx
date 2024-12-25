'use client';

import { ReactNode } from 'react';

import { ThemeProvider, useTheme } from 'next-themes';

import { Toaster } from '@/components/ui/sonner';

const ToasterProvider = () => {
  const { resolvedTheme } = useTheme();

  // TODO: Customize toaster
  return (
    <Toaster
      position='top-right'
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
    />
  );
};

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      enableSystem
      attribute='class'
      defaultTheme='system'
      disableTransitionOnChange
    >
      {children}
      <ToasterProvider />
    </ThemeProvider>
  );
};

export default Providers;
