'use client';

import Image from 'next/image';
import Link from 'next/link';
// import { useRouter } from "next/navigation"

function Logo() {
  // const router = useRouter()
  return (
    <Link href='/'>
      <Image
        alt='Logo'
        width={100}
        height={100}
        src='/images/logo.png'
        className='hidden lg:block'
      />
      <Image
        alt='Logo mobile'
        width={34}
        height={34}
        src='/images/airbnb-logo-mobile.png'
        className='block aspect-square lg:hidden'
      />
    </Link>
  );
}

export default Logo;
