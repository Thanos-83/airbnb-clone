import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaStar } from 'react-icons/fa6';
import { PiDotOutlineBold } from 'react-icons/pi';

function Review({ review, inDialog, isMobile }) {
  return (
    <div
      className={`${
        !isMobile && 'rounded-xl shadow-xl p-6 my-8'
      } md:rounded-none md:shadow-none md:p-0 md:my-0 flex flex-col`}>
      <div
        className={`${
          !isMobile && 'order-3'
        } mt-auto pt-8 md:pt-0 md:mt-0 md:order-none flex items-center gap-3`}>
        <Avatar className='w-16 h-16'>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <p className='font-semibold'>{review.reviewer_name}</p>
          <p className='font-normal'>Reviewer Place</p>
        </div>
      </div>
      <div className='flex items-center gap-1 mt-4 mb-2'>
        <span className='flex items-center gap-[1px]'>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </span>
        <PiDotOutlineBold className='w-2 h-2' />
        <p>{review.date.$date}</p>
      </div>
      <div>
        <p className={`${!inDialog && 'line-clamp-3'}`}>{review.comments}</p>
      </div>
    </div>
  );
}

export default Review;
