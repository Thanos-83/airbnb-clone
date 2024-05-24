'use client';

import Categories from '../Categories/Categories';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import { IoMdSearch } from 'react-icons/io';

import { PiUserCircleLight } from 'react-icons/pi';
import { PiHeartLight } from 'react-icons/pi';

import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { LoginModal } from '../Auth/LoginModal';
import LoginModalMobile from './LoginModalMobile';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Avatar, AvatarImage } from '../ui/avatar';

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  // console.log('Session: ', session);
  // console.log('Session status: ', status);
  const pathnameArray = pathname.split('/');
  const pathnameLength = pathnameArray.length;
  const inWishlist =
    pathnameLength === 3 && pathnameArray.includes('wishlists');
  const [lastScroll, setLastScroll] = useState(0);
  const [scrollDown, setScrollDown] = useState(false);
  const [scrollUp, setScrollUp] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      setLastScroll(currentScroll);

      if (currentScroll > 200) {
        setScrollDown(true);
        setScrollUp(false);
      }

      if (currentScroll < lastScroll) {
        setScrollDown(false);
        setScrollUp(true);
      }
    });
  });

  // console.log(lastScroll);

  return (
    <>
      <header
        className={`
        ${pathname.split('/').includes('rooms') && 'hidden'} 
        ${pathname.split('/').includes('wishlists') && 'hidden sm:block'} 
        ${pathname.split('/')[1] !== 'rooms' && 'sticky top-0'} 
        w-full bg-white z-50 border-bottom border-[#f7f7f7]`}>
        <div className='py-4 border-b-[1px]'>
          <Container fluid={pathname === '/search' || inWishlist}>
            <div className='hidden sm:flex items-center gap-3 justify-between'>
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
            <div className='flex-1 sm:hidden'>
              <Search />
            </div>
          </Container>
        </div>
        {(pathname === '/' || pathname === '/search') && <Categories />}
      </header>
      <div
        className={`border-t border-t-[#EBEBEB] shadow shadow-fuchsia-900 sm:hidden ${
          pathname.split('/').includes('rooms') ? 'hidden' : 'fixed'
        }  bottom-0 left-0 right-0 py-3 bg-white z-50 transition-transform duration-500 ease-in-out ${
          scrollDown && ' translate-y-full'
        } ${scrollUp && 'delay-300 translate-y-0'}`}>
        <nav className='flex justify-center items-center gap-8'>
          <Link
            href='/'
            className={`flex flex-col items-center gap-1  ${
              pathname === '/' || pathname === '/search'
                ? 'text-[var(--primary-color)]'
                : 'text-[var(--primary-gray)]'
            }`}>
            <IoMdSearch className='w-6 h-6' />
            <span className='text-[0.625rem]'>Expore</span>
          </Link>
          <Link
            href='/wishlists'
            className={`flex flex-col items-center gap-1 text-[var(--primary-gray)] ${
              pathname === '/wishlists' && 'text-[var(--primary-color)]'
            }`}>
            <PiHeartLight className='w-6 h-6' />
            <span className='text-[0.625rem]'>Wishlist</span>
          </Link>
          {session?.user ? (
            <button
              className='flex flex-col items-center gap-1 text-[var(--primary-gray)] '
              onClick={() => signOut()}>
              <Avatar className='w-6 h-6 rounded-full border border-[var(--primary-gray)]'>
                <AvatarImage src={session?.user ? session?.user.image : null} />
              </Avatar>
              <span className='text-[0.625rem]'> Sign Out</span>
            </button>
          ) : (
            <LoginModalMobile />
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
