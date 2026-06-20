'use server';

import fs from 'fs';
import path from 'path';
import { Resend } from 'resend';

import { ContactUsEmailTemplate } from '@/components/atoms/emails/contact-form-email';
import { addEmailForNewsletterSubscription } from '@/database/actions/subscribe';

import {
  type ContactFormInput,
  ContactFormSchema,
  type NewsLetterFormInput,
  NewsLetterFormSchema,
} from '../schemas';

const RESEND_KEY = process.env.RESEND_API_KEY ?? '';

const resend = new Resend(RESEND_KEY);

export const sendEmail = async (data: ContactFormInput) => {
  const result = ContactFormSchema.safeParse(data);

  if (result.error) {
    return { error: result.error.issues[0].message, success: false };
  }

  try {
    const { email, message, name } = result.data;

    const githubIcon = fs
      .readFileSync(
        path.join(process.cwd(), 'public', 'images', 'email', 'github.png')
      )
      .toString('base64');
    const linkedinIcon = fs
      .readFileSync(
        path.join(process.cwd(), 'public', 'images', 'email', 'linked-in.png')
      )
      .toString('base64');
    const twitterIcon = fs
      .readFileSync(
        path.join(process.cwd(), 'public', 'images', 'email', 'twitter.png')
      )
      .toString('base64');
    const logoImage = fs
      .readFileSync(
        path.join(process.cwd(), 'public', 'images', 'email', 'logo.png')
      )
      .toString('base64');

    const { data, error } = await resend.emails.send({
      attachments: [
        {
          content: githubIcon,
          contentId: 'github-icon',
          filename: 'github.png',
        },
        {
          content: linkedinIcon,
          contentId: 'linkedin-icon',
          filename: 'linked-in.png',
        },
        {
          content: twitterIcon,
          contentId: 'twitter-icon',
          filename: 'twitter.png',
        },
        {
          content: logoImage,
          contentId: 'logo-image',
          filename: 'logo.png',
        },
      ],

      cc: ['hi@krishal-shah.in'],
      from: 'hi@krishal-shah.in',
      react: ContactUsEmailTemplate({ email, message, name }),
      subject: 'Thanks for reaching out to me!',
      text: `Name: ${name}\nEmail: ${email}\nMessage:${message}`,
      to: [email],
    });

    if (error) {
      throw new Error(`Resend Error: ${error.message}`);
    }

    if (!data) {
      throw new Error('No data returned from Resend.');
    }

    return { success: true };
  } catch (error: unknown) {
    const err = error as Error;
    throw new Error(err.message || 'An unexpected error occurred.');
  }
};

export const subscribe = async (data: NewsLetterFormInput) => {
  const formatData = NewsLetterFormSchema.safeParse(data);

  if (formatData.error) {
    return { error: formatData.error.issues[0].message, success: false };
  }

  const result = await addEmailForNewsletterSubscription(data);

  return result;
};
