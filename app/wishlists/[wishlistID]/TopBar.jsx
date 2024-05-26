'use client';
import { usePathname, useRouter } from 'next/navigation';
import { LiaAngleLeftSolid } from 'react-icons/lia';
import { BsThreeDots } from 'react-icons/bs';
import { PiUploadSimpleBold } from 'react-icons/pi';

import { useLayoutEffect, useEffect, useState } from 'react';
import { WishlistSettings } from '@/components/wishlist/WishlistSettings';

function TopBar({ wishlistInfo }) {
  const router = useRouter();
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const h = document.querySelector('header').clientHeight;
    setHeaderHeight(h + 2);
  }, []);
  // console.log('Header Height: ', headerHeight);
  return (
    <div
      className={`topBar flex-1 sticky top-0 sm:top-[95px] flex items-center justify-between py-4 px-4 sm:px-0 bg-white z-20`}>
      <button
        onClick={() => router.back()}
        className='rounded-full relative before:absolute before:w-[40px] before:h-[40px] before:rounded-full before:z-[-1] before:-top-[75%] before:-left-[75%] hover:before:bg-[#F7F7F7] lg:before:w-[48px] lg:before:h-[48px] lg:before:-top-[50%] lg:before:-left-[50%]'>
        <LiaAngleLeftSolid className='h-4 w-4 lg:h-6 lg:w-6' />
      </button>
      <div className='flex items-center gap-4'>
        <button className='rounded-full hover:bg-black hover:bg-opacity-5 p-3'>
          <PiUploadSimpleBold className='h-4 w-4 lg:h-6 lg:w-6' />
        </button>
        <WishlistSettings wishlistInfo={wishlistInfo} />
      </div>
    </div>
  );
}

export default TopBar;
