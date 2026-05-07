import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateReadTime = (content: string) => {
  // The average adult reading speed varies between 200 to 250 words per minute (WPM).
  const wordsPerMinute = 200;

  // Word count of the content
  const wordCount = content.trim().split(/\s+/).length;

  return Math.ceil(wordCount / wordsPerMinute);
};
