import type { Metadata, Viewport } from 'next';

import ToggleTheme from '@/components/atoms/toggle-theme';
import ResetAnalytics from '@/components/dev-only/reset-analytics';
import AnalyticsConsentModal from '@/components/molecules/analytics-consent';
import SiteHeader from '@/components/organisms/site-header';
import { siteConfig } from '@/config';
import { cn } from '@/lib/utils';
import Providers from '@/providers';

import Footer from './(home)/_components/footer';
import './globals.css';

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
          'flex min-h-screen flex-col overflow-x-hidden antialiased'
        )}
      >
        <Providers>
          <SiteHeader showThemeToggle themeToggle={<ToggleTheme />} />
          <main className='grow'>{children}</main>
          <Footer />
          <AnalyticsConsentModal />

          {/* This will be shown in development mode only */}
          <ResetAnalytics />
        </Providers>
      </body>
    </html>
  );
}
