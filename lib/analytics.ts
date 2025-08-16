/* eslint-disable import/no-named-as-default-member */
// Why suppress these warnings? Because there are errors for mixPanel methods.
import mixPanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

let isInitialized = false;

export const shouldShowAnalyticsPermission = () => {
  if (typeof window === 'undefined') return false;

  const analyticsConsent = localStorage.getItem('analytics-consent');

  if (analyticsConsent === null) {
    return true;
  }

  return false;
};

export const getAnalyticsConsent = (): string | undefined => {
  if (typeof window === 'undefined') return;

  return localStorage.getItem('analytics-consent')?.toString();
};

export const resetAnalytics = () => {
  if (typeof window === 'undefined') return;

  if (isInitialized) {
    mixPanel.reset();
    localStorage.removeItem('analytics-consent');
    window.location.reload();
  }
};

export const giveAnalyticsConsent = (optIn: boolean): void => {
  if (typeof window === 'undefined') return;

  localStorage.setItem('analytics-consent', optIn.toString());
};

const setTrackingStatus = () => {
  const hasAnalyticsConsent =
    localStorage.getItem('analytics-consent') === 'true';

  if (hasAnalyticsConsent) {
    mixPanel.opt_in_tracking();
  } else {
    mixPanel.opt_out_tracking();
  }
};

export const initAnalytics = () => {
  if (typeof window === 'undefined') return;

  if (!MIXPANEL_TOKEN) {
    // eslint-disable-next-line no-console
    console.warn('Mixpanel token is missing! Check your .env file.');
    return;
  }

  if (isInitialized) {
    setTrackingStatus();
    return;
  }

  mixPanel.init(MIXPANEL_TOKEN, {
    debug: true,
    persistence: 'cookie',
    track_pageview: true,
  });

  isInitialized = true;
  setTrackingStatus();
};

export const trackEvent = (
  eventName: string,
  properties: Record<string, string> = {}
) => {
  if (!MIXPANEL_TOKEN) {
    // eslint-disable-next-line no-console
    console.warn('Mixpanel token is missing! Check your .env file.');
    return;
  }

  if (typeof window === undefined || !isInitialized) return;

  if (mixPanel && 'track' in mixPanel) {
    mixPanel.track(eventName, { ...properties });
  }

  return;
};
