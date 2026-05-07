'use client';

import { ThemeProvider, useTheme } from 'next-themes';
import { ReactNode, useEffect } from 'react';

import { Toaster } from '@/components/ui/sonner';
import { initAnalytics } from '@/lib/analytics';

const ToasterProvider = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      position='top-right'
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      toastOptions={{
        classNames: {
          actionButton: 'bg-primary text-primary-foreground',
          cancelButton: 'bg-muted text-muted-foreground',
          description: 'text-muted-foreground',
          toast: 'border border-border bg-background text-foreground',
        },
      }}
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
      attribute='class'
      defaultTheme='system'
      disableTransitionOnChange
      enableSystem
    >
      {children}
      <ToasterProvider />
    </ThemeProvider>
  );
};

export default Providers;
