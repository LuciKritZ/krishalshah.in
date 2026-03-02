'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import EventButton from '@/components/event-button';
import EventLink from '@/components/event-link';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { NewsLetterFormInput, NewsLetterFormSchema } from '@/lib/schemas';
import { subscribe } from '@/lib/server/resend';

import FormErrorMessage from '../../../components/form-error-message';

// TODO: Add newsletter feature for marketing
const NewsLetterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<NewsLetterFormInput>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(NewsLetterFormSchema),
  });

  const email = watch('email');

  const processForm: SubmitHandler<NewsLetterFormInput> = async data => {
    const result = await subscribe(data)
      .catch(res => res)
      .finally(() => {
        reset();
      });

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success('Subscribed successfully!');
    reset();
  };

  return (
    <Card className='rounded-lg border'>
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
          className='flex flex-col items-center gap-3'
          onSubmit={handleSubmit(processForm)}
        >
          <div className='w-full'>
            <Input
              autoComplete='email'
              className='w-full'
              id='email'
              placeholder='Email'
              type='email'
              {...register('email')}
            />

            <FormErrorMessage message={errors?.email?.message} />
          </div>

          <div className='w-full'>
            <EventButton
              className='w-full disabled:opacity-50'
              disabled={isSubmitting}
              eventName='Clicked on Submit button - NewsLetter'
              eventProperties={{
                input: email,
              }}
              type='submit'
            >
              {isSubmitting ? 'Submitting...' : 'Subscribe'}
            </EventButton>
          </div>

          <div>
            <p className='text-xs text-muted-foreground'>
              We care about your data. Read our{' '}
              <EventLink
                className='font-bold'
                eventName='Clicked on privacy policy'
                href='/privacy'
              >
                privacy&nbsp;policy.
              </EventLink>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewsLetterForm;
