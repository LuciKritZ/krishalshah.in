import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'default' | 'warning' | 'danger';
}

const Callout = ({ children, type = 'default', ...props }: CalloutProps) => {
  return (
    <div
      className={cn(
        'my-6 items-start rounded-md border-border border-l-4 p-4 w-full dark:max-w-none',
        {
          'border-red-900 bg-red-50 dark:prose': type === 'danger',
          'border-yellow-900 bg-yellow-50 dark:prose': type === 'warning',
        }
      )}
      {...props}
    >
      <div>{children}</div>
    </div>
  );
};

export default Callout;
