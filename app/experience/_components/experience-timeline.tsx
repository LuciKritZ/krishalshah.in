'use client';

import { motion, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';

import BodyText from '@/components/atoms/body-text';
import DisplayTitle from '@/components/atoms/display-title';
import { SectionHeader } from '@/components/atoms/section';
import ExperienceCard from '@/components/molecules/experience-card';
import { EXPERIENCES } from '@/config';

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    offset: ['start 20%', 'end 80%'],
    target: containerRef,
  });

  const scaleY = useSpring(scrollYProgress, {
    damping: 30,
    restDelta: 0.001,
    stiffness: 100,
  });

  return (
    <>
      <SectionHeader>
        <DisplayTitle as='h1'>
          CAREER <span className='text-content-tertiary'>TIMELINE</span>
        </DisplayTitle>
        <BodyText>
          A detailed log of my professional journey, technical milestones, and
          the systems I&apos;ve helped build along the way.
        </BodyText>
      </SectionHeader>

      <div className='relative' ref={containerRef}>
        <div className='absolute bottom-8 left-0 top-2 hidden w-px bg-border md:block' />

        <motion.div
          className='absolute bottom-8 left-0 top-2 hidden w-px origin-top bg-brand shadow-[0_0_15px_rgba(var(--color-brand-rgb),0.5)] md:block'
          style={{ scaleY }}
        />

        <div className='flex flex-col gap-0 md:space-y-ui-3xl'>
          {EXPERIENCES.map((experience, index) => (
            <ExperienceCard
              index={index}
              key={experience._id}
              {...experience}
            />
          ))}
        </div>
      </div>

      {/* Education Section */}
      <motion.div
        className='mt-ui-3xl border-t border-border pt-ui-3xl'
        initial={{ opacity: 0 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1 }}
      >
        <h2 className='font-display mb-ui-xl text-4xl font-bold tracking-tight'>
          EDUCATION
        </h2>
        <div className='rounded-sm border border-border bg-surface/50 p-ui-xl'>
          <div className='mb-ui-md flex flex-col justify-between gap-ui-md md:flex-row'>
            <h3 className='font-display text-xl font-bold'>
              B.E. Computer Engineering
            </h3>
            <span className='micro-text text-content-tertiary'>
              2015 — 2019
            </span>
          </div>
          <p className='text-sm text-content-tertiary'>
            GTU, Ahmedabad • CGPA: 8.16
          </p>
        </div>
      </motion.div>
    </>
  );
}
