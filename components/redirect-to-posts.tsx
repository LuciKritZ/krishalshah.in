import { HTMLAttributes } from 'react';

import { ArrowLeftIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import EventLink from './event-link';
import { buttonVariants } from './ui/button';

interface RedirectToPostsProps {
  className?: HTMLAttributes<HTMLAnchorElement>['className'];
  linkText?: string;
}

const RedirectToPosts = ({
  linkText = 'Other Posts',
  className = '',
}: RedirectToPostsProps) => {
  return (
    <EventLink
      className={cn(
        buttonVariants({ className: '', size: 'sm', variant: 'link' }),
        'mb-8 inline-flex items-center gap-2 text-sm font-normal text-muted-foreground p-0',
        className
      )}
      eventName={`Clicked on ${linkText} - Redirect to posts`}
      href='/posts'
    >
      <ArrowLeftIcon className='h-5 w-5' />
      <span>{linkText}</span>
    </EventLink>
  );
};

export default RedirectToPosts;
