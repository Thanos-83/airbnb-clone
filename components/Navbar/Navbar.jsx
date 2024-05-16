'use client';

import Categories from '../Categories/Categories';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { LoginModal } from '../Auth/LoginModal';

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  // console.log('Session: ', session);
  // console.log('Session status: ', status);
  // console.log('Pathname:: ', pathname.split('/')[1]);
  return (
    <header
      className={`${
        pathname.split('/')[1] !== 'rooms' && 'sticky top-0'
      } w-full bg-white z-50 border-bottom border-[#f7f7f7]`}>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex items-center gap-3 justify-between'>
            <Logo />
            <Search />
            <div className='relative'>
              <div className='flex items-center gap-4'>
                <button
                  onClick={() => {}}
                  className='
            hidden
            lg:block
            text-lg
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            '>
                  Airbnb your home
                </button>
                <LoginModal session={session} />
              </div>
            </div>
          </div>
        </Container>
      </div>
      {(pathname === '/' ||
        pathname === '/search' ||
        pathname === '/auth/signin') && <Categories />}
    </header>
  );
};

export default Navbar;
