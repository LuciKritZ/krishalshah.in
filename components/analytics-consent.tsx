'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config';
import {
  initAnalytics,
  giveAnalyticsConsent,
  shouldShowAnalyticsPermission,
} from '@/lib/analytics';

export default function AnalyticsBanner() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const isSocialRedirect = Object.keys(siteConfig.links).some(
      platform => pathname === `/${platform}`
    );
    const isNotFoundPage = !!document.querySelector('[data-not-found-page]');

    if (
      typeof window !== 'undefined' &&
      shouldShowAnalyticsPermission() &&
      !isSocialRedirect &&
      !isNotFoundPage
    ) {
      setVisible(true);
    }
  }, [pathname]);

  const handleAccept = () => {
    giveAnalyticsConsent(true);
    initAnalytics();
    setVisible(false);
  };

  const handleDecline = () => {
    giveAnalyticsConsent(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className='fixed inset-x-4 bottom-4 z-50 max-w-3xl mx-auto px-0 sm:px-4'>
      <Card className='rounded-lg border-2 border-primary/20 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/75'>
        <CardContent className='p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div className='text-sm text-muted-foreground'>
            Hey, Krishal here! I use privacy-friendly analytics to improve this
            website - no tracking, I promise. Would you like to opt in?
          </div>
          <div className='flex gap-2 items-center justify-end shrink-0'>
            <Button
              className='text-xs sm:text-sm border-[1px] border-primary-foreground'
              onClick={handleDecline}
              size='sm'
              variant='ghost'
            >
              No, thanks!
            </Button>
            <Button
              className='text-xs sm:text-sm'
              onClick={handleAccept}
              size='sm'
            >
              Yes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
