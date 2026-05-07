'use client';

import { motion } from 'motion/react';

import PageContainer from '@/components/atoms/page-container';
import StatusIndicator from '@/components/atoms/status-indicator';
import SocialRail from '@/components/molecules/social-rail';

const Hero = () => {
  return (
    <section className='relative flex min-h-screen items-center justify-center overflow-hidden'>
      <PageContainer isFluid>
        <div className='relative z-10 text-center'>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className='micro-text mb-4 block text-brand'>
              Senior Software Engineer
            </span>
            <h1 className='font-display text-[15vw] font-bold leading-[0.8] tracking-tighter text-content-primary md:text-[12vw]'>
              KRISHAL
              <br />
              <span className='font-rage mt-2 block text-[18vw] lowercase text-brand first-letter:uppercase md:mt-4 md:text-[15vw]'>
                Shah
              </span>
            </h1>
          </motion.div>

          <motion.div
            animate={{ opacity: 1 }}
            className='mx-auto max-w-xl text-md leading-relaxed text-content-secondary md:text-xl pt-10'
            initial={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Building high-performance software systems and scalable
            architectures with 6+ years of experience at big tech companies like
            Uber and fast-growing startups like Photosynth AI.
          </motion.div>
        </div>
      </PageContainer>

      <SocialRail />
      <StatusIndicator />
    </section>
  );
};

export default Hero;
