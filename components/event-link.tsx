'use client';

import { UrlObject } from 'url';

import { HTMLAttributeAnchorTarget, HTMLAttributeReferrerPolicy } from 'react';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';

import { trackEvent } from '@/lib/analytics';

type LinkProps = NextLinkProps & {
  children?: React.ReactNode;
  className?: string;
  eventName?: string;
  eventProps?: Record<string, string>;
  href: UrlObject | string;
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
        eventName && trackEvent(eventName, eventProps);
        onClick?.(e);
      }}
      {...linkProps}
    />
  );
};

export default EventLink;
