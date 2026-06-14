import ToggleTheme from '@/components/atoms/toggle-theme';
import SiteHeader from '@/components/organisms/site-header';

import Footer from './_components/footer';

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader showThemeToggle themeToggle={<ToggleTheme />} />
      <main className='grow'>{children}</main>
      <Footer />
    </>
  );
}
