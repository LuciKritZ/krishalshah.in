import { ArrowLeftIcon } from 'lucide-react';
import { HTMLAttributes } from 'react';

import EventLink from '@/components/atoms/event-link';
import { cn } from '@/lib/utils';

interface RedirectToPostsProps {
  className?: HTMLAttributes<HTMLAnchorElement>['className'];
  linkText?: string;
}

const RedirectToPosts = ({
  className = '',
  linkText = 'Other Posts',
}: RedirectToPostsProps) => {
  return (
    <EventLink
      className={cn(
        'group mb-12 inline-flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-content-tertiary transition-colors hover:text-brand',
        className
      )}
      eventName={`Clicked on ${linkText} - Redirect to posts`}
      href='/posts'
    >
      <ArrowLeftIcon className='h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1' />
      <span>{linkText}</span>
    </EventLink>
  );
};

export default RedirectToPosts;
