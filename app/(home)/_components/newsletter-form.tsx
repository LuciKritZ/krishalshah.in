'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { NewsLetterFormSchema } from '@/lib/schemas';
import { subscribe } from '@/lib/server-actions';

import FormErrorMessage from '../../../components/form-error-message';

type NewsLetterInput = z.infer<typeof NewsLetterFormSchema>;

// TODO: Add newsletter feature for marketing
const NewsLetterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsLetterInput>({
    resolver: zodResolver(NewsLetterFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const processForm: SubmitHandler<NewsLetterInput> = async (data) => {
    const result = await subscribe(data);

    if (result?.error) {
      toast.error('An error occured! Please try again!');
    }

    toast.success('Subscribed successfully!');
    reset();
  };

  return (
    <Card className='rounded-lg border-[1px]'>
      <CardContent className='flex flex-col gap-8 pt-6 md:flex-row md:justify-between'>
        <div>
          <h2 className='md:text-2xl text-xl font-bold'>
            Subscribe to my newsletter!
          </h2>

          <p className='mt-2 text-muted-foreground'>
            Get updates on my work and projects.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(processForm)}
          className='flex flex-col items-center gap-3'
        >
          <div className='w-full'>
            <Input
              type='email'
              id='email'
              autoComplete='email'
              placeholder='Email'
              className='w-full'
              {...register('email')}
            />

            <FormErrorMessage message={errors?.email?.message} />
          </div>

          <div className='w-full'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full disabled:opacity-50'
            >
              {isSubmitting ? 'Submitting...' : 'Subscribe'}
            </Button>
          </div>

          <div>
            <p className='text-xs text-muted-foreground'>
              We care about your data. Read our{' '}
              <Link href='/privacy' className='font-bold'>
                privacy&nbsp;policy.
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewsLetterForm;
