import type { Metadata } from 'next';

import { ArrowLeftIcon } from 'lucide-react';

import EventLink from '@/components/atoms/event-link';

export const metadata: Metadata = {
  title: '404: Secret Unlocked',
};

const NotFound = () => (
  <div
    className='flex min-h-screen flex-col items-center justify-center bg-background px-6'
    data-not-found-page
  >
    <div className='mx-auto max-w-2xl text-center md:text-left'>
      <main className='flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12'>
        <div className='font-display text-8xl font-black tracking-tighter text-border md:text-9xl'>
          404
        </div>

        <div className='flex flex-col gap-6 md:border-l md:border-border md:pl-12'>
          <div className='space-y-2'>
            <h1 className='font-display text-3xl font-bold tracking-tight text-content-primary md:text-4xl'>
              Congratulations!
              <br />
              <span className='text-brand'>
                You&apos;ve unlocked a secret page.
              </span>
            </h1>
            <p className='text-lg text-content-secondary'>
              Just kidding, it doesn&apos;t exist. <br />
              <span className='whitespace-nowrap'>
                But you found a nice kaomoji:{' '}
                <span className='font-mono text-brand'>（っ＾▿＾）</span>
              </span>
            </p>
          </div>

          <div className='pt-4'>
            <EventLink
              className='group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-content-tertiary transition-colors hover:text-brand'
              eventName='Go back home - Page Not Found'
              href='/'
            >
              <ArrowLeftIcon className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
              <span>Return to Reality</span>
            </EventLink>
          </div>
        </div>
      </main>
    </div>
  </div>
);

export default NotFound;
