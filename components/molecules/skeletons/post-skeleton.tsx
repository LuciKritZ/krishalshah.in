import SurfaceCard from '@/components/atoms/surface-card';
import { Skeleton } from '@/components/ui/skeleton';

export function PostSkeleton() {
  return (
    <SurfaceCard className='flex min-h-[280px] flex-col'>
      <div className='flex flex-1 flex-col'>
        <div className='mb-6 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Skeleton className='h-3 w-20' />
            <Skeleton className='h-3 w-20' />
          </div>
        </div>

        <Skeleton className='mb-4 h-8 w-3/4' />

        <div className='mb-6 space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-[90%]' />
          <Skeleton className='h-4 w-[75%]' />
        </div>

        <div className='mt-auto space-y-6'>
          <div className='flex gap-2'>
            <Skeleton className='h-5 w-12 rounded-full' />
            <Skeleton className='h-5 w-16 rounded-full' />
            <Skeleton className='h-5 w-14 rounded-full' />
          </div>
          <Skeleton className='h-3 w-24' />
        </div>
      </div>
    </SurfaceCard>
  );
}
