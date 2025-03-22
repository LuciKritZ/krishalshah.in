'use client';

import { ReactNode, useEffect } from 'react';

import { ThemeProvider, useTheme } from 'next-themes';

import { Toaster } from '@/components/ui/sonner';
import { initAnalytics } from '@/lib/analytics';

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
  useEffect(() => {
    // Initialize Analytics
    initAnalytics();
  }, []);

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
