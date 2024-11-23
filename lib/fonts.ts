import { Source_Code_Pro } from 'next/font/google';
import localFont from 'next/font/local';

export const firaCode = localFont({
  src: '../assets/fonts/FiraCode-Regular.ttf',
});

export const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] });
