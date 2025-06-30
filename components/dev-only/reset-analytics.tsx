'use client';

import { useEffect, useState } from 'react';

import { RotateCcw } from 'lucide-react';

import { getAnalyticsConsent, resetAnalytics } from '@/lib/analytics';
import { cn } from '@/lib/utils';

const ResetAnalytics = () => {
  const [analyticsConsent, setAnalyticsConsent] = useState(false);

  useEffect(() => {
    setAnalyticsConsent(getAnalyticsConsent() ?? false);
  }, []);

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 px-0 w-auto text-xl cursor-pointer',
        !analyticsConsent && isDev ? 'hidden' : ''
      )}
      onClick={resetAnalytics}
    >
      <RotateCcw size={20} className='size-10 text-muted-foreground' />
    </div>
  );
};

export default ResetAnalytics;
