import type { Metadata, Viewport } from 'next';

import './globals.css';
import { sourceCodePro } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import Providers from '@/providers';

import Footer from './(home)/_components/footer';
import Header from './(home)/_components/header';
import { siteConfig } from '@/config';

export const metadata: Metadata = {
  title: siteConfig.author,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen flex-col antialiased',
          sourceCodePro.className
        )}
      >
        <Providers>
          <Header />
          <main className='grow'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
