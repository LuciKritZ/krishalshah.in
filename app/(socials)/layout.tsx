import ToggleTheme from '@/components/atoms/toggle-theme';
import SiteHeader from '@/components/organisms/site-header';

export default function SocialsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader showThemeToggle themeToggle={<ToggleTheme />} />
      <main className='grow'>{children}</main>
    </>
  );
}
