'use client';

import { RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

import { getAnalyticsConsent, resetAnalytics } from '@/lib/analytics';
import { cn } from '@/lib/utils';

const ResetAnalytics = () => {
  const [analyticsConsent, setAnalyticsConsent] = useState<string | undefined>(
    ''
  );

  useEffect(() => {
    setAnalyticsConsent(getAnalyticsConsent());
  }, []);

  const isDev = process.env.NODE_ENV === 'development';

  if (!isDev) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 px-0 w-auto text-xl cursor-pointer',
        !analyticsConsent?.trim() ? 'hidden' : ''
      )}
      onClick={resetAnalytics}
    >
      <RotateCcw className='size-10 text-muted-foreground' size={20} />
    </div>
  );
};

export default ResetAnalytics;
