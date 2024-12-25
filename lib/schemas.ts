import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .min(2, { message: 'Name must be at least 2 characters.' }),
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email('Invalid email.'),
  message: z.string().min(1, { message: 'Message is required.' }),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

export const NewsLetterFormSchema = z.object({
  email: z.string().email('Invalid email.'),
});

export type NewsLetterFormInput = z.infer<typeof NewsLetterFormSchema>;

export const LoginFormSchema = z.object({
  email: z.string().email('Invalid email.'),
  password: z
    .string()
    .min(8, { message: 'Password should have minimum 8 characters' })
    .max(16, { message: 'Password can not exceed more than 16 characters.' }),
});

export type LoginFormInput = z.infer<typeof LoginFormSchema>;

export const RegisterFormSchema = z.object({
  email: z.string().email('Invalid email.'),
  password: z
    .string()
    .min(8, { message: 'Password should have minimum 8 characters' })
    .max(16, { message: 'Password can not exceed more than 16 characters.' }),
  name: z
    .string()
    .min(3, { message: 'Name should be of minimum 3 characters' }),
});

export type RegisterFormInput = z.infer<typeof RegisterFormSchema>;
