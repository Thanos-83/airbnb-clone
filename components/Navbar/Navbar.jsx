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
  const pathnameArray = pathname.split('/');
  const pathnameLength = pathnameArray.length;
  const inWishlist =
    pathnameLength === 3 && pathnameArray.includes('wishlists');
  // console.log('Pathname:: ', pathname.split('/'));
  return (
    <header
      className={`${
        pathname.split('/')[1] !== 'rooms' && 'sticky top-0'
      } w-full bg-white z-50 border-bottom border-[#f7f7f7]`}>
      <div className='py-4 border-b-[1px]'>
        <Container fluid={pathname === '/search' || inWishlist}>
          <div className='flex items-center gap-3 justify-between'>
            <Logo />
            <div className='flex-1 max-w-[900px] hidden sm:block'>
              <Search />
            </div>
            <div className='relative'>
              <div className='flex items-center gap-4'>
                <button
                  onClick={() => {}}
                  className='hidden lg:block text-lg font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition'>
                  Airbnb your home
                </button>
                <LoginModal session={session} />
              </div>
            </div>
          </div>
          <div className='flex-1 mt-4 sm:hidden'>
            <Search />
          </div>
        </Container>
      </div>
      {(pathname === '/' || pathname === '/search') && <Categories />}
    </header>
  );
};

export default Navbar;
