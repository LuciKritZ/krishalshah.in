'use server';

import { NewsLetterFormInput } from '@/lib/schemas';

import { dbConnection } from '../db-connection';
import Subscription from '../models/subscriptions.model';

export const addEmailForNewsletterSubscription = async (
  values: NewsLetterFormInput
) => {
  const { email } = values;

  try {
    await dbConnection();
    const emailFound = await Subscription.findOne({ email });

    if (emailFound) {
      throw new Error('You are already subscribed, much love! 🫶🏻');
    }

    const emailAdded = new Subscription({
      email,
    });

    const savedEmail = await emailAdded.save();

    return {
      name: savedEmail.email.toString(),
      success: true,
    };
  } catch (error: unknown) {
    let errorMessage =
      'Unknown error, please try again or reach out to hi@krishalshah.in';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    return {
      error: errorMessage,
      success: false,
    };
  }
};
