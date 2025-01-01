import { HTMLAttributes } from 'react';

import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { buttonVariants } from './ui/button';

interface RedirectToPostsProps {
  linkText?: string;
  className?: HTMLAttributes<HTMLAnchorElement>['className'];
}

const RedirectToPosts = ({
  linkText = 'Other Posts',
  className = '',
}: RedirectToPostsProps) => {
  return (
    <Link
      href='/posts'
      className={cn(
        buttonVariants({ variant: 'link', size: 'sm', className: '' }),
        'mb-8 inline-flex items-center gap-2 text-sm font-normal text-muted-foreground p-0',
        className
      )}
    >
      <ArrowLeftIcon className='h-5 w-5' />
      <span>{linkText}</span>
    </Link>
  );
};

export default RedirectToPosts;
