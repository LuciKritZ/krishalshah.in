'use server';

import { Resend } from 'resend';

import { ContactUsEmailTemplate } from '@/components/emails/contact-form-email';
import { addEmailForNewsletterSubscription } from '@/database/actions/subscribe';

import {
  type ContactFormInput,
  type NewsLetterFormInput,
  ContactFormSchema,
  NewsLetterFormSchema,
} from './schemas';

const RESEND_KEY = process.env.RESEND_API_KEY ?? '';

const resend = new Resend(RESEND_KEY);

export const sendEmail = async (data: ContactFormInput) => {
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
      react: ContactUsEmailTemplate({ name, email, message }),
    });

    if (!data || error) {
      throw new Error('Failed to send email.');
    }

    return { success: true };
  } catch (error) {}
};

export const subscribe = async (data: NewsLetterFormInput) => {
  const formatData = NewsLetterFormSchema.safeParse(data);

  if (formatData.error) {
    return { error: formatData.error.format() };
  }

  const result = await addEmailForNewsletterSubscription(data);

  return result;
};
