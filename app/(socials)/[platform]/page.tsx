'use client';

import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';

import { siteConfig, SOCIAL_LINKS } from '@/config';
import { trackEvent } from '@/lib/analytics';

export default function SocialRedirect() {
  const params = useParams();
  const platform = params?.platform?.toString().toLowerCase();

  const allPlatforms = Object.keys(SOCIAL_LINKS);

  const isValidPlatform = platform != null && allPlatforms.includes(platform);

  useEffect(() => {
    if (!isValidPlatform || !platform) return;

    const redirectUrl = SOCIAL_LINKS[platform as keyof typeof SOCIAL_LINKS];

    trackEvent('Social Link Clicked', {
      platform,
      url: redirectUrl,
    });

    const timeout = setTimeout(() => {
      window.location.href = redirectUrl;
    }, 200);

    return () => clearTimeout(timeout);
  }, [platform, isValidPlatform]);

  if (!isValidPlatform) {
    return notFound();
  }

  return (
    <div className='flex items-center justify-center h-screen text-sm text-gray-500'>
      Redirecting {siteConfig.loadingTexts[9]}...
    </div>
  );
}
