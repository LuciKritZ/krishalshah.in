'use client';

import { slug } from 'github-slugger';
import { Delete } from 'lucide-react';

import EventButton from './event-button';
import EventLink from './event-link';
import { badgeVariants } from './ui/badge';

interface TagProps {
  tag: string;
  current?: boolean;
  count?: number;
  disableLink?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
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
        variant: current ? 'default' : 'secondary',
        className:
          'no-underline rounded-lg h-6 transition-colors duration-200 ease-linear my-1',
      })}
      href={`/posts/?selectedTags=${tag.trim()}`}
      onClick={(e) => e.stopPropagation()}
      eventName={`Clicked on Tag - ${tag}`}
    >
      {tag} {count ? `(${count})` : null}
    </EventLink>
  ) : (
    <EventButton
      className={badgeVariants({
        variant: current || isSelected ? 'default' : 'secondary',
        className:
          'no-underline rounded-lg text-xs font-semibold py-0.5 px-2.5 h-6 transition-colors duration-200 ease-linear',
      })}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      eventName={`Clicked on Tag - ${tag}`}
    >
      {tag} {count ? `(${count})` : null}
      {isSelected ? <Delete className='size-5' /> : null}
    </EventButton>
  );

export default Tag;
