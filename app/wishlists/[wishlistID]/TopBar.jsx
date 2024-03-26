'use client';
import { usePathname, useRouter } from 'next/navigation';
import { LiaAngleLeftSolid } from 'react-icons/lia';
import { BsThreeDots } from 'react-icons/bs';
import { PiUploadSimpleBold } from 'react-icons/pi';

import { useLayoutEffect, useEffect, useState } from 'react';
import { WishlistSettings } from '@/components/wishlist/WishlistSettings';

function TopBar({ wishlistInfo }) {
  const router = useRouter();
  const [headerHeight, setHeaderHeight] = useState();

  useLayoutEffect(() => {
    const h = document.querySelector('header').clientHeight;
    setHeaderHeight(h + 2);
  }, []);
  return (
    <div
      className={`topBar flex-1 sticky top-[${headerHeight}px] flex items-center justify-between py-4 bg-white z-10`}>
      <button
        onClick={() => router.back()}
        className='rounded-full hover:bg-black hover:bg-opacity-5 p-3'>
        <LiaAngleLeftSolid className='h-6 w-6' />
      </button>
      <div className='flex items-center gap-4'>
        <button className='rounded-full hover:bg-black hover:bg-opacity-5 p-3'>
          <PiUploadSimpleBold className='h-6 w-6' />
        </button>
        <WishlistSettings wishlistInfo={wishlistInfo} />
      </div>
    </div>
  );
}

export default TopBar;
