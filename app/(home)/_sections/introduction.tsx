import Image from 'next/image';

import { siteConfig } from '@/config';

const Introduction = () => (
  <section className='flex flex-col-reverse items-center md:items-start gap-y-6 gap-x-10 md:gap-y-4 md:flex-row'>
    <div className='mt-2 flex-1 md:mt-0 text-center md:text-start'>
      <h1 className='title no-underline'>
        Hey, I&#39;m <span className='underline'>{siteConfig.author}</span>.
      </h1>
      <p className='mt-4 text-muted-foreground text-balance'>
        {siteConfig.description}
      </p>
    </div>

    <div className='relative'>
      <Image
        className='flex-1 md:rounded-lg grayscale rounded-full'
        src='/images/me.jpg'
        alt={siteConfig.author}
        width={192}
        height={192}
        priority
      />
    </div>
  </section>
);

export default Introduction;
