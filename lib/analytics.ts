import mixPanel from "mixpanel-browser";

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

let isInitialized = false;

export const initAnalytics = () => {
  if (!MIXPANEL_TOKEN) {
    console.warn("Mixpanel token is missing! Check your .env file.");
    return;
  }

  mixPanel.init(MIXPANEL_TOKEN, {
    debug: true,
    track_pageview: true,
    persistence: "cookie",
  });

  isInitialized = true;
};

export const trackEvent = (
  eventName: string,
  properties: Record<string, string> = {}
) => {
  if (!MIXPANEL_TOKEN) {
    console.warn("Mixpanel token is missing! Check your .env file.");
    return;
  }

  if (typeof window === undefined || !isInitialized) return;

  if (mixPanel && "track" in mixPanel) {
    mixPanel.track(eventName, { ...properties });
  }

  return;
};
