'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import EventButton from '@/components/atoms/event-button';
import EventLink from '@/components/atoms/event-link';
import FormErrorMessage from '@/components/atoms/form-error-message';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ContactFormInput, ContactFormSchema } from '@/lib/schemas';
import { sendEmail } from '@/lib/server/resend';

const ContactForm = () => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<ContactFormInput>({
    defaultValues: {
      email: '',
      message: '',
      name: '',
    },
    resolver: zodResolver(ContactFormSchema),
  });

  const name = watch('name');
  const email = watch('email');
  const message = watch('message');

  const processForm: SubmitHandler<ContactFormInput> = async data => {
    const sendingEmailStatus = await sendEmail(data);

    if (sendingEmailStatus?.error) {
      toast.error('An error occurred! Please try again.');
      return;
    }

    toast.success('Message sent successfully!');
    reset();
  };

  return (
    <div className='relative'>
      <form
        className='lg:flex-auto'
        method='POST'
        noValidate
        onSubmit={handleSubmit(processForm)}
      >
        <div className='grid grid-cols-1 gap-ui-lg sm:grid-cols-2'>
          {/* Name field */}
          <div>
            <Input
              autoComplete='given-name'
              className='h-12 rounded-sm border-border bg-surface/50 transition-all focus:border-brand/50'
              id='name'
              placeholder='Name'
              type='text'
              {...register('name')}
            />

            <FormErrorMessage message={errors?.name?.message} />
          </div>

          {/* Email field */}
          <div>
            <Input
              autoComplete='email'
              className='h-12 rounded-sm border-border bg-surface/50 transition-all focus:border-brand/50'
              id='email'
              placeholder='Email'
              type='email'
              {...register('email')}
            />

            <FormErrorMessage message={errors?.email?.message} />
          </div>

          {/* Message field */}
          <div className='sm:col-span-2'>
            <Textarea
              className='min-h-[150px] rounded-sm border-border bg-surface/50 transition-all focus:border-brand/50'
              placeholder='Message'
              rows={4}
              {...register('message')}
            />
            <FormErrorMessage message={errors?.message?.message} />
          </div>
        </div>

        <div className='mt-8'>
          <EventButton
            className='w-full py-6 disabled:opacity-50'
            disabled={isSubmitting}
            eventName='Clicked on Contact us button - Contact Form'
            eventProperties={{
              email,
              message,
              name,
            }}
            type='submit'
          >
            {isSubmitting ? 'Sending...' : 'Contact us'}
          </EventButton>
          <p className='mt-4 text-xs text-content-tertiary'>
            By submitting this form, I agree to the&nbsp;
            <EventLink
              className='font-bold text-brand transition-colors hover:text-content-primary'
              eventName='Clicked on privacy policy from Contact Form'
              href='/privacy'
            >
              privacy&nbsp;policy.
            </EventLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
