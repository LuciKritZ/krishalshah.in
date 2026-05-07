import SurfaceCard from '@/components/atoms/surface-card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProjectSkeleton() {
  return (
    <SurfaceCard className='flex min-h-[280px] flex-col'>
      <div className='flex flex-1 flex-col'>
        <div className='mb-ui-md flex items-start justify-between'>
          <Skeleton className='h-8 w-2/3' />
          <div className='flex gap-ui-sm'>
            <Skeleton className='h-10 w-10 rounded-full' />
            <Skeleton className='h-10 w-10 rounded-full' />
          </div>
        </div>

        <div className='mb-ui-xl space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-[90%]' />
          <Skeleton className='h-4 w-[75%]' />
        </div>

        <div className='mt-auto space-y-ui-lg'>
          <div className='flex items-center gap-ui-md'>
            <Skeleton className='h-5 w-10 rounded-sm' />
            <Skeleton className='h-5 w-10 rounded-sm' />
          </div>

          <div className='flex items-center gap-2 pt-ui-md'>
            <Skeleton className='h-6 w-16 rounded-full' />
            <Skeleton className='h-6 w-20 rounded-full' />
            <Skeleton className='h-6 w-14 rounded-full' />
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
}
