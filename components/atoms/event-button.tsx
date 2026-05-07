import { Button, ButtonProps } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

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
      onClick={e => {
        if (eventName) trackEvent(eventName, eventProperties);
        onClick?.(e);
      }}
      {...buttonProps}
    />
  );
};

export default EventButton;
