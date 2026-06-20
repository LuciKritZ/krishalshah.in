'use client';

import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import PageContainer from '@/components/atoms/page-container';
import Section from '@/components/atoms/section';
import { Input } from '@/components/ui/input';
import { subscribe } from '@/lib/server/resend';

const Connect = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const result = await subscribe({ email });

      if (result.success) {
        toast.success('Thanks for subscribing to the Blog!');
        setEmail('');
      } else {
        toast.error(
          typeof result.error === 'string'
            ? result.error
            : 'Something went wrong. Please try again.'
        );
      }
    } catch {
      toast.error('Failed to connect to the server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section
      className='relative overflow-hidden border-t border-border bg-background'
      id='contact'
    >
      {/* Glow - Dynamic based on theme */}
      <div
        className='pointer-events-none absolute inset-0 z-0'
        style={{
          background:
            'radial-gradient(circle at 50% 100%, var(--glow-color) 0%, transparent 70%)',
        }}
      />

      <PageContainer className='relative z-10'>
        <div className='grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-8'>
          {/* Left Col - Let's Build */}
          <div className='relative flex flex-col justify-start border-b border-border pb-16 lg:border-b-0 lg:pb-0'>
            <div className='mb-6 flex items-center gap-4'>
              <div className='bg-brand h-2 w-2 animate-pulse rounded-full'></div>
              <span className='text-brand text-[10px] font-bold uppercase tracking-[0.2em]'>
                Collaborate
              </span>
            </div>

            <h2 className='font-display mb-8 text-5xl font-bold leading-[0.9] tracking-tighter text-content-primary md:text-7xl'>
              LET&apos;S <br />
              <span className='bg-linear-to-r from-brand to-content-primary bg-clip-text text-transparent'>
                BUILD.
              </span>
            </h2>

            <p className='text-content-secondary mb-10 max-w-sm text-base font-medium leading-relaxed lg:text-lg'>
              Currently open to open-source collaborations and new opportunities
              to build impactful systems together.
            </p>

            <div className='relative z-20 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center'>
              <a
                className='bg-brand text-background cursor-pointer px-8 py-4 text-center text-xs font-bold uppercase tracking-widest transition-colors hover:bg-content-primary hover:text-background'
                href='mailto:krishals.001@gmail.com'
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right Col - Join the Blog */}
          <div className='relative flex flex-col justify-end lg:pl-16 xl:pl-24'>
            <div className='mb-10 lg:mb-12'>
              <div className='mb-4 flex items-center gap-4'>
                <span className='text-content-tertiary text-[10px] font-bold uppercase tracking-[0.2em]'>
                  Join the Blog
                </span>
              </div>
              <h3 className='font-display mb-4 text-3xl font-bold tracking-tight text-content-primary md:text-4xl'>
                Stay Tuned
              </h3>
              <p className='text-content-secondary max-w-md text-base font-medium leading-relaxed lg:text-lg'>
                Periodic observations on software engineering, fresh
                experiments, and new essays.
              </p>
            </div>

            <form className='relative z-20 w-full' onSubmit={handleSubscribe}>
              <fieldset className='space-y-6' disabled={isSubmitting}>
                <div className='group relative'>
                  <Input
                    className='h-auto rounded-2xl border-none bg-surface/50 p-5 text-xl font-bold tracking-tight text-content-primary shadow-2xl ring-1 ring-border/50 backdrop-blur-3xl transition-all placeholder:text-content-tertiary/40 focus:ring-brand/50 focus-visible:ring-brand/50 lg:p-6 lg:text-2xl'
                    id='newsletter'
                    onChange={e => setEmail(e.target.value)}
                    placeholder='hi@krishal-shah.in'
                    required
                    type='email'
                    value={email}
                  />
                </div>

                <div className='flex flex-col justify-between gap-6 px-1 sm:flex-row sm:items-center'>
                  <div className='flex flex-col gap-1.5 text-left'>
                    <span className='text-content-tertiary text-[10px] font-bold uppercase tracking-widest'>
                      Expect: Deep dives, Code, UI/UX
                    </span>
                    <span className='text-brand text-[10px] font-bold uppercase tracking-widest'>
                      Unsubscribe Anytime.
                    </span>
                  </div>
                  <button
                    className='bg-content-primary text-background group relative inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-3 rounded-sm px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] transition-colors hover:bg-brand hover:text-background disabled:opacity-50 sm:w-auto'
                    disabled={isSubmitting}
                    type='submit'
                  >
                    {isSubmitting ? (
                      <>
                        <span>Subscribing</span>
                        <Loader2 className='animate-spin' size={16} />
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <svg
                          className='transition-transform group-hover:translate-x-1'
                          fill='none'
                          height='16'
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          viewBox='0 0 24 24'
                          width='16'
                        >
                          <path d='M5 12h14'></path>
                          <path d='m12 5 7 7-7 7'></path>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
};

export default Connect;
