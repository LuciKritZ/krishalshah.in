'use client';

import { motion, useScroll } from 'motion/react';

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden
      className='fixed top-0 left-0 right-0 z-50 h-1 origin-left bg-tectonic'
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgressBar;
