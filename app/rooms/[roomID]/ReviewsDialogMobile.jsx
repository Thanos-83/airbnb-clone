'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import Reviews from './Reviews';
import { IoClose } from 'react-icons/io5';
import { IoIosSearch } from 'react-icons/io';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import Ratings from './Ratings';

export function ReviewsDialogMobile({ reviewScores, reviews, isMobile }) {
  const [searchReview, setSearchReview] = useState('');

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className='w-full block md:hidden text-black text-xl py-4 px-6 border rounded-lg border-[#222222] bg-white hover:bg-[#F7F7F7] hover:border-black mt-12'>
          Show all {reviews.length} reviews
        </button>
      </DrawerTrigger>
      <DrawerContent className='h-[90vh] p-0 overflow-hidden'>
        <div className='flex flex-col gap-3 flex-1 px-6 py-6 '>
          <ScrollArea className='reviews_drawer_scores w-80vw'>
            <Ratings inDialog={true} reviewScores={reviewScores} />
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
          <ScrollArea className='reviews_drawer_reviews  w-full'>
            <div className='sticky -top-[1px] pb-8 bg-white z-20'>
              <div className='mb-8'>
                <p className='font-semibold text-2xl text-[#222222]'>
                  {reviews.length} reviews
                </p>
              </div>
              <div className='search_reviews flex items-center h-full rounded-full border-2 border-[#b0b0b0] overflow-hidden'>
                <IoIosSearch className='font-semibold w-6 h-6 ml-3' />
                <label htmlFor='reviewsInput' className='src-only'></label>
                <input
                  onChange={(e) => setSearchReview(e.target.value)}
                  name='reviewsInput'
                  type='text'
                  value={searchReview}
                  placeholder='Search reviews'
                  className='flex-1 bg-white px-2 py-2 outline-none'
                />
                {searchReview && (
                  <button
                    onClick={() => setSearchReview('')}
                    className='rounded-full p-1 bg-[#dddddd] mr-3'>
                    <IoClose />
                  </button>
                )}
              </div>
            </div>
            <Reviews isMobile={isMobile} inDialog={true} reviews={reviews} />
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
