'use client';

import { slug } from 'github-slugger';
import { Delete } from 'lucide-react';
import Link from 'next/link';

import { badgeVariants } from './ui/badge';
import { Button } from './ui/button';

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
    <Link
      className={badgeVariants({
        variant: current ? 'default' : 'secondary',
        className:
          'no-underline rounded-lg h-6 transition-colors duration-200 ease-linear',
      })}
      href={`/posts/?selectedTags=${slug(tag)}`}
      onClick={(e) => e.stopPropagation()}
    >
      {tag} {count ? `(${count})` : null}
    </Link>
  ) : (
    <Button
      className={badgeVariants({
        variant: current || isSelected ? 'default' : 'secondary',
        className:
          'no-underline rounded-lg text-xs font-semibold py-0.5 px-2.5 h-6 transition-colors duration-200 ease-linear',
      })}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      {tag} {count ? `(${count})` : null}
      {isSelected ? <Delete className='size-5' /> : null}
    </Button>
  );

export default Tag;
