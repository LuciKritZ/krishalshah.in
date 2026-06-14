import type { Metadata, Viewport } from 'next';

import { Inter, Space_Grotesk } from 'next/font/google';
import localFont from 'next/font/local';

import ResetAnalytics from '@/components/dev-only/reset-analytics';
import AnalyticsConsentModal from '@/components/molecules/analytics-consent';
import { siteConfig } from '@/config';
import { cn } from '@/lib/utils';
import Providers from '@/providers';

import './globals.css';

const inter = Inter({
  display: 'block',
  subsets: ['latin'],
  variable: '--font-sans-var',
  weight: ['300', '400', '600', '800'],
});

const spaceGrotesk = Space_Grotesk({
  display: 'block',
  subsets: ['latin'],
  variable: '--font-display-var',
  weight: ['300', '500', '700'],
});

const rageItalic = localFont({
  display: 'block',
  src: './fonts/RAGE.woff',
  variable: '--font-rage-var',
});

export const metadata: Metadata = {
  authors: [
    {
      name: 'Krishal Shah',
      url: 'https://github.com/LuciKritZ',
    },
  ],
  creator: 'Krishal Shah',
  description: siteConfig.description,
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
  openGraph: {
    description: siteConfig.description,
    locale: 'en_US',
    siteName: siteConfig.name,
    title: siteConfig.name,
    type: 'website',
    url: siteConfig.url,
  },
  title: {
    default: siteConfig.author,
    template: `%s | ${siteConfig.author}`,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { color: 'white', media: '(prefers-color-scheme: light)' },
    { color: 'black', media: '(prefers-color-scheme: dark)' },
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
          inter.variable,
          spaceGrotesk.variable,
          rageItalic.variable,
          'flex min-h-screen flex-col overflow-x-hidden antialiased'
        )}
      >
        <Providers>
          {children}
          <AnalyticsConsentModal />

          {/* This will be shown in development mode only */}
          <ResetAnalytics />
        </Providers>
      </body>
    </html>
  );
}
