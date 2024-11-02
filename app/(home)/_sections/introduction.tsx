import React from 'react';

import Image from 'next/image';

import { siteConfig } from '@/config';

const Introduction = () => (
  <section className='flex flex-col-reverse items-start gap-x-10 gap-y-4 md:flex-row'>
    <div className='mt-2 flex-1 md:mt-0'>
      <h1 className='title no-underline'>Hey, I&#39;m {siteConfig.author}.</h1>
      <p className='mt-3 font-light text-muted-foreground'>
        {siteConfig.description}
      </p>
    </div>

    <div className='relative'>
      <Image
        className='flex-1 rounded-lg grayscale'
        src='/images/me.jpg'
        alt={siteConfig.fullName}
        width={175}
        height={175}
        priority
      />
    </div>
  </section>
);

export default Introduction;
