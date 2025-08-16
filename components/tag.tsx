'use client';

import { Delete } from 'lucide-react';

import EventButton from './event-button';
import EventLink from './event-link';
import { badgeVariants } from './ui/badge';

interface TagProps {
  count?: number;
  current?: boolean;
  disableLink?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  tag: string;
}

const Tag = ({
  tag,
  current,
  count,
  disableLink = false,
  onClick,
  isSelected = false,
}: TagProps) =>
  !disableLink ? (
    <EventLink
      className={badgeVariants({
        className:
          'no-underline rounded-lg h-6 transition-colors duration-200 ease-linear my-1',
        variant: current ? 'default' : 'secondary',
      })}
      eventName={`Clicked on Tag - ${tag}`}
      href={`/posts/?selectedTags=${tag.trim()}`}
      onClick={e => e.stopPropagation()}
    >
      {tag} {count ? `(${count})` : null}
    </EventLink>
  ) : (
    <EventButton
      className={badgeVariants({
        className:
          'no-underline rounded-lg text-xs font-semibold py-0.5 px-2.5 h-6 transition-colors duration-200 ease-linear',
        variant: current || isSelected ? 'default' : 'secondary',
      })}
      eventName={`Clicked on Tag - ${tag}`}
      onClick={e => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      {tag} {count ? `(${count})` : null}
      {isSelected ? <Delete className='size-5' /> : null}
    </EventButton>
  );

export default Tag;
