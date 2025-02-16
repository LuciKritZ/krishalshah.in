import { trackEvent } from '@/lib/analytics';

import { Button, ButtonProps } from './ui/button';

type EventButtonProps = ButtonProps & {
  eventName?: string;
  eventProperties?: Record<string, string>;
};

const EventButton = ({
  eventName,
  eventProperties,
  onClick,
  ...buttonProps
}: EventButtonProps) => {
  return (
    <Button
      onClick={(e) => {
        eventName && trackEvent(eventName, eventProperties);
        onClick?.(e);
      }}
      {...buttonProps}
    />
  );
};

export default EventButton;
