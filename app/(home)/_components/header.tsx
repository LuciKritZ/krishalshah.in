import Logo from '@/components/logo';
import ToggleTheme from '@/components/toggle-theme';

import MdNav from './nav/md-nav';
import SmNav from './nav/sm-nav';

const Header = () => {
  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-background/75 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-14'>
      <nav className='container flex max-w-3xl items-center justify-between h-[40px]'>
        <Logo />

        <MdNav />

        <div className='flex items-center justify-end'>
          <SmNav />
          <ToggleTheme />
        </div>
      </nav>
    </header>
  );
};

export default Header;
