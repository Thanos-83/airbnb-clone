'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

function CategoryBox({ label, icon: Icon }) {
  const router = useRouter()
  // const searchParams = useSearchParams()
  // console.log(searchParams.getAll('search'));
  const handleCategorySearch = ()=>{
    router.push(`/?category=${label}`)
    // alert(label)
  }

  return (
    <button onClick={handleCategorySearch} className='relative before:absolute before:w-full before:h-[0px] before:left-0 before:bottom-0 before:z-10 before:bg-black py-4 flex flex-col items-center gap-2 text-[#717171]'>
      <Icon size={34} className=''/>
      <p className='font-[600] text-[0.8rem]'>{label}</p>
    </button>
  );
}

export default CategoryBox;
