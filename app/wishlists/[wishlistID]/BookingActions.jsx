'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';

function BookingActions() {
  const [totalHeight, setTotalHeight] = useState(0);

  useLayoutEffect(() => {
    const h1 = document.querySelector('header').clientHeight;
    const h2 = document.querySelector('.topBar').clientHeight;
    setTotalHeight(h2);
  }, []);
  return (
    <div
      className={`sticky border-b border-b-[var(--secondary-gray)] sm:border-b-0 top-[78px] pt-2  sm:top-[170px] flex items-center gap-4 bg-white pb-2 md:pb-6 z-10`}>
      <button className='ml-4 sm:ml-0 py-[12px] px-[16px] border border-[#dddddd] bg-white rounded-full leading-5 text-[#222222]'>
        Add dates
      </button>
      <button className='py-[12px] px-[16px] border border-[#dddddd] bg-white rounded-full leading-5 text-[#222222]'>
        1 guest
      </button>
    </div>
  );
}

export default BookingActions;
