import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <section className='pb-24 pt-40'>
      <div className='min-h-full px-4 sm:px-6 sm:py-24 md:grid md:place-items-center'>
        <div className='mx-auto container max-w-3xl'>
          <main className='sm:flex'>
            <p className='text-3xl font-bold tracking-tight sm:text-5xl text-muted-foreground'>
              404
            </p>
            <div className='sm:ml-6'>
              <div className='sm:border-l sm:border-gray-200 sm:pl-6'>
                <h1 className='text-xl font-bold tracking-tight'>
                  Congratulations, you&apos;ve unlocked the secret page!
                </h1>
                <p className='mt-1 text-base text-muted-foreground'>
                  Just kidding, it doesn&apos;t exist. （っ＾▿＾）
                </p>
              </div>

              <div className='mt-10 flex space-x-3 sm:border-1 sm:border-transparent'>
                <Link
                  href='/'
                  className='inline-flex items-center gap-3 text-muted-foreground'
                >
                  <ArrowLeftIcon className='h-5 w-5' />
                  <span>Go back home</span>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
