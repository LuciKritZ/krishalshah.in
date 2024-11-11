'use client';

import { slug } from 'github-slugger';
import Link from 'next/link';
import { badgeVariants } from './ui/badge';

interface TagProps {
  tag: string;
  current?: boolean;
  count?: number;
}

const Tag = ({ tag, current, count }: TagProps) => (
  <Link
    className={badgeVariants({
      variant: current ? 'default' : 'secondary',
      className: 'no-underline rounded-lg',
    })}
    href={`/tags/${slug(tag)}`}
    onClick={(e) => e.stopPropagation()}
  >
    {tag} {count ? `(${count})` : null}
  </Link>
);

export default Tag;
