"use client";

import { useEffect } from "react";

import { notFound, useParams } from "next/navigation";

import { SiteConfig, siteConfig } from "@/config";
import { trackEvent } from "@/lib/analytics";

export default function SocialRedirect() {
  const params = useParams();
  const platform = params?.platform?.toString().toLowerCase();

  const allPlatforms = Object.keys(siteConfig.links);

  const isValidPlatform = allPlatforms.includes(platform);

  useEffect(() => {
    if (!isValidPlatform || !platform) return;

    const redirectUrl = siteConfig.links[platform as keyof SiteConfig["links"]];

    trackEvent("Social Link Clicked", {
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
    <div className="flex items-center justify-center h-screen text-sm text-gray-500">
      Redirecting {siteConfig.loadingTexts[9]}...
    </div>
  );
}
