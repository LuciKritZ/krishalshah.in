'use client';

import { useState } from 'react';

import Image from 'next/image';

import EditContent from '@/components/edit-content';
import { siteConfig } from '@/config';

const EditIntro = () => {
  const [author, setAuthor] = useState(siteConfig.author);
  const [description, setDescription] = useState(siteConfig.description);
  return (
    <section className='pt-24'>
      <h2 className='title mb-12'>Introduction</h2>
      <div className='flex flex-col-reverse items-center md:items-start gap-y-6 gap-x-10 md:gap-y-4 md:flex-row'>
        <div className='mt-2 flex-1 md:mt-0 text-start'>
          <h1 className='title no-underline flex items-center'>
            Hey, I&#39;m&nbsp;
            <div className='underline'>
              <EditContent
                initialContent={author}
                onUpdateContent={(updatedContent: string) =>
                  setAuthor(updatedContent)
                }
              />
            </div>
            .
          </h1>
          <div className='mt-4 text-muted-foreground text-balance'>
            <EditContent
              containerClassName='gap-0'
              initialContent={description}
              onUpdateContent={(updatedContent: string) =>
                setDescription(updatedContent)
              }
            />
          </div>
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
      </div>
    </section>
  );
};

export default EditIntro;
