import { ArrowLeftIcon } from 'lucide-react';
import type { Metadata } from 'next';

import EventLink from '@/components/event-link';

export const metadata: Metadata = {
  title: '404: Not Found',
};

const NotFound = () => (
  <div
    className='flex h-screen flex-col items-center justify-center'
    data-not-found-page
  >
    <h1 className='text-4xl font-bold'>404 - Page Not Found</h1>
    <p className='text-lg text-muted-foreground'>
      <section className='pb-24 pt-40'>
        <div className='min-h-full px-4 sm:px-6 sm:py-24 md:grid md:place-items-center'>
          <div className='mx-auto container max-w-3xl'>
            <main className='sm:flex'>
              <p className='text-8xl font-bold tracking-tight sm:text-7xl text-muted-foreground'>
                404
              </p>
              <div className='sm:ml-6'>
                <div className='sm:border-l sm:border-gray-200 sm:pl-6 leading-3'>
                  <h1 className='text-xl font-bold tracking-tight'>
                    Congratulations, you&apos;ve unlocked the secret page!
                  </h1>
                  <p className='mt-1 text-base text-muted-foreground'>
                    Just kidding, it doesn&apos;t exist.
                  </p>
                  <p className='leading-7'>（っ＾▿＾）</p>
                </div>

                <div className='mt-10 flex space-x-3 sm:border-1 sm:border-transparent'>
                  <EventLink
                    className='inline-flex items-center gap-3 text-muted-foreground'
                    eventName='Go back home - Page Not Found'
                    href='/'
                  >
                    <ArrowLeftIcon className='h-5 w-5' />
                    <span>Go back home</span>
                  </EventLink>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </p>
  </div>
);

export default NotFound;
