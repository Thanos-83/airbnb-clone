'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';

function BookingActions() {
  const [totalHeight, setTotalHeight] = useState();

  useLayoutEffect(() => {
    const h1 = document.querySelector('header').clientHeight;
    const h2 = document.querySelector('.topBar').clientHeight;
    setTotalHeight(h1 + h2);
  }, []);
  return (
    <div
      className={`sticky top-[176px] flex items-center gap-4 bg-white pb-6 z-10`}>
      <button className='py-[12px] px-[16px] border border-[#dddddd] bg-white rounded-full leading-5 text-[#222222]'>
        Add dates
      </button>
      <button className='py-[12px] px-[16px] border border-[#dddddd] bg-white rounded-full leading-5 text-[#222222]'>
        1 guest
      </button>
    </div>
  );
}

export default BookingActions;
