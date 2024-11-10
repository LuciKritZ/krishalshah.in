'use server';

import { Resend } from 'resend';
import { z } from 'zod';

import ContactFormEmail from '@/components/emails/contact-form-email';

import { ContactFormSchema, NewsLetterFormSchema } from './schemas';

type ContactInputs = z.infer<typeof ContactFormSchema>;
type SubscribeParams = { email: string };

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (data: ContactInputs) => {
  const result = ContactFormSchema.safeParse(data);

  if (result.error) {
    return { error: result.error.format() };
  }

  try {
    const { name, email, message } = result.data;
    const { data, error } = await resend.emails.send({
      from: 'hi@krishalshah.in',
      to: [email],
      cc: ['hi@krishalshah.in'],
      subject: 'Thanks for reaching out to me!',
      text: `Name: ${name}\nEmail: ${email}\nMessage:${message}`,
      react: ContactFormEmail({ name, email, message }),
    });

    if (!data || error) {
      throw new Error('Failed to send email.');
    }

    return { success: true };
  } catch (error) {}
};

export const subscribe = async (data: SubscribeParams) => {
  const result = NewsLetterFormSchema.safeParse(data);

  if (result.error) {
    return { error: result.error.format() };
  }

  // TODO: Implement Mailchimp integration
  return { success: true };
};
