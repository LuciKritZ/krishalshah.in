import { cn } from '@/lib/utils';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-content-primary/5 dark:bg-white/5',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
