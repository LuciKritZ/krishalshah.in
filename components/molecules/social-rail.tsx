'use client';

import { motion } from 'motion/react';

import { siteConfig } from '@/config';

const SocialRail = () => {
  return (
    <>
      {/* Desktop Rail (md and above) */}
      <div className='absolute bottom-0 left-12 z-20 hidden flex-col items-center md:flex'>
        <div className='mb-10 flex flex-col gap-10'>
          {siteConfig.socialLinks.map((social, i) => (
            <motion.a
              animate={{ opacity: 1, x: 0 }}
              className='group relative flex items-center'
              href={social.link}
              initial={{ opacity: 0, x: -20 }}
              key={social.title}
              rel='noopener noreferrer'
              target='_blank'
              transition={{ delay: 1.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className='relative z-10 rounded-sm border border-border bg-obsidian p-2.5 transition-all duration-500 group-hover:border-tectonic/40 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:text-tertiary [&_svg]:transition-colors [&_svg]:duration-500 group-hover:[&_svg]:text-primary'>
                {social.icon}
              </div>

              <div className='pointer-events-none absolute left-full ml-4 flex items-center opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
                <div className='h-px w-0 bg-tectonic/30 transition-all duration-500 ease-out group-hover:w-8' />
                <span className='ml-0 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.6em] text-primary/0 transition-all duration-500 group-hover:ml-4 group-hover:text-tectonic'>
                  {social.title}
                </span>
              </div>

              <div className='absolute inset-0 -z-10 bg-tectonic/0 blur-xl transition-all duration-500 group-hover:bg-tectonic/5' />
            </motion.a>
          ))}
        </div>

        {/* Architectural Line */}
        <motion.div
          animate={{ height: 120 }}
          className='w-px bg-linear-to-b from-border via-border/50 to-transparent'
          initial={{ height: 0 }}
          transition={{ delay: 1.8, duration: 1.5, ease: 'circOut' }}
        />
      </div>

      {/* Mobile Dock (below md) */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className='absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-slab/80 p-1 backdrop-blur-xl md:hidden'
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: 1.5 }}
      >
        {siteConfig.socialLinks.map(social => (
          <a
            className='p-3 text-secondary transition-colors hover:text-brand [&_svg]:h-[18px] [&_svg]:w-[18px]'
            href={social.link}
            key={social.title}
            rel='noopener noreferrer'
            target='_blank'
          >
            {social.icon}
          </a>
        ))}
      </motion.div>
    </>
  );
};

export default SocialRail;
