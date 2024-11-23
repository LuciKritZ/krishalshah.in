import type { Metadata, Viewport } from 'next';

import { siteConfig } from '@/config';
import { sourceCodePro } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import Providers from '@/providers';

import Footer from './(home)/_components/footer';
import Header from './(home)/_components/header';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.author,
    template: `%s | ${siteConfig.author}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Tailwind',
    'Server Components',
    'shadcnui',
    'JavaScript',
    'Typescript',
    'JSX',
    'TSX',
    'JS',
    'Node.js',
    'Blog',
    'Technical Blog',
  ],
  authors: [
    {
      name: 'Krishal Shah',
      url: 'https://github.com/LuciKritZ',
    },
  ],
  creator: 'Krishal Shah',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
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
