'use client';

import Marquee from '@/components/molecules/marquee';
import { NAVIGATION_OPTIONS, siteConfig } from '@/config';

import BackToTop from './back-to-top';
import FooterClock from './footer-clock';

const GREETINGS = [
  'HELLO',
  'NAMASTE',
  'HOLA',
  'BONJOUR',
  'CIAO',
  'KONNICHIWA',
  'HALLO',
  'MARHABA',
];

const Footer = () => {
  return (
    <footer className='border-t border-border bg-background relative flex flex-col overflow-hidden px-6 pb-8 pt-16 text-content-primary md:px-12'>
      <div className='relative z-10 mb-16 flex flex-col justify-between gap-16 font-mono text-sm uppercase tracking-widest md:mb-24 md:flex-row'>
        <div className='flex flex-col gap-8 md:gap-12'>
          <span className='text-content-tertiary text-[10px] font-bold tracking-[0.2em]'>
            (Socials)
          </span>
          <div className='font-display flex flex-col gap-2 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-content-primary'>
            <a
              className='hover:text-brand transition-all duration-300 hover:translate-x-4 w-fit'
              href={siteConfig.resumeDoc}
              rel='noopener noreferrer'
              target='_blank'
            >
              RESUME
            </a>
            {siteConfig.socialLinks.map(social => (
              <a
                className='hover:text-brand transition-all duration-300 hover:translate-x-4 w-fit'
                href={social.link}
                key={social._id}
                rel='noopener noreferrer'
                target='_blank'
              >
                {social.title.toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        <div className='absolute left-1/2 top-0 -translate-x-1/2 hidden md:block'>
          <BackToTop />
        </div>

        <div className='flex flex-col gap-8 text-left md:items-end md:gap-12 md:text-right'>
          <span className='text-content-tertiary text-[10px] font-bold tracking-[0.2em] md:text-right'>
            (Navigation)
          </span>
          <div className='font-display flex flex-col gap-2 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-content-primary'>
            {NAVIGATION_OPTIONS.map(option => (
              <a
                className='hover:text-brand transition-all duration-300 hover:translate-x-4 md:ml-auto md:hover:-translate-x-4'
                href={option.href}
                key={option.name}
              >
                {option.name.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className='mb-16 flex justify-center md:hidden'>
        <BackToTop />
      </div>

      <div className='footer-mask relative z-0 mb-6 flex w-full overflow-hidden whitespace-nowrap md:mb-8'>
        <Marquee className='pr-8 md:pr-12' duration={80} pauseOnHover={false}>
          <h2 className='font-display text-[12vw] font-bold leading-[0.75] tracking-tighter text-content-primary/20 dark:text-content-primary/30'>
            {GREETINGS.join('\u00A0\u00A0')}
            {'\u00A0\u00A0'}
          </h2>
        </Marquee>
      </div>

      <div className='relative z-10 mt-2 flex flex-col items-start justify-between gap-8 font-mono text-[10px] uppercase tracking-widest text-content-tertiary sm:flex-row sm:items-end sm:gap-0'>
        <div className='flex items-center gap-4 sm:gap-6'>
          <FooterClock />
        </div>

        <div className='flex flex-col items-start gap-1 font-bold sm:items-end'>
          <span>© {new Date().getFullYear()}</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
