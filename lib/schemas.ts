import { z } from 'zod';

export const ContactFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email('Invalid email.'),
  message: z.string().min(1, { message: 'Message is required.' }),
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .min(2, { message: 'Name must be at least 2 characters.' }),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

export const NewsLetterFormSchema = z.object({
  email: z.string().email('Invalid email.'),
});

export type NewsLetterFormInput = z.infer<typeof NewsLetterFormSchema>;
