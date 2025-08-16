'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import EventButton from '@/components/event-button';
import EventLink from '@/components/event-link';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ContactFormInput, ContactFormSchema } from '@/lib/schemas';
import { sendEmail } from '@/lib/server/resend';

import FormErrorMessage from '../../../components/form-error-message';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
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
    <section className='relative isolate'>
      <div className='relative'>
        <form
          className='mt-16 lg:flex-auto'
          noValidate
          onSubmit={handleSubmit(processForm)}
        >
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            {/* Name field */}
            <div>
              <Input
                autoComplete='given-name'
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
                placeholder='Message'
                rows={4}
                {...register('message')}
              />
              <FormErrorMessage message={errors?.message?.message} />
            </div>
          </div>

          <div className='mt-6'>
            <EventButton
              className='w-full disabled:opacity-50'
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
            <p className='mt-4 text-xs text-muted-foreground'>
              By submitting this form, I agree to the&nbsp;
              <EventLink
                className='font-bold'
                eventName='Clicked on privacy policy from Contact Form'
                href='/privacy'
              >
                privacy&nbsp;policy.
              </EventLink>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
