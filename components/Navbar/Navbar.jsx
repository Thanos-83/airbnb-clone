'use client';

import Categories from '../Categories/Categories';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import { usePathname } from 'next/navigation';

const Navbar = ({ session }) => {
  const pathname = usePathname();
  return (
    <header className='sticky top-0 w-full bg-white z-50 border-bottom border-[#f7f7f7]'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex items-center gap-3 justify-between'>
            <Logo />
            <Search />
            <UserMenu session={session} />
          </div>
        </Container>
      </div>
      {pathname === '/' && <Categories />}
    </header>
  );
};

export default Navbar;
