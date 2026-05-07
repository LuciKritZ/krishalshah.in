'use client';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { HTMLAttributeAnchorTarget, HTMLAttributeReferrerPolicy } from 'react';
import { UrlObject } from 'url';

import { trackEvent } from '@/lib/analytics';

type LinkProps = NextLinkProps & {
  children?: React.ReactNode;
  className?: string;
  eventName?: string;
  eventProps?: Record<string, string>;
  href: string | UrlObject;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  target?: HTMLAttributeAnchorTarget | undefined;
};

const EventLink = ({
  eventName,
  eventProps,
  onClick,
  ...linkProps
}: LinkProps) => {
  return (
    <NextLink
      onClick={e => {
        if (eventName) trackEvent(eventName, eventProps);
        onClick?.(e);
      }}
      {...linkProps}
    />
  );
};

export default EventLink;
