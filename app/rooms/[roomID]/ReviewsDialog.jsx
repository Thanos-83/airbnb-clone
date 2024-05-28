'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { useForm } from 'react-hook-form';

import { toast } from 'sonner';
import { usePathname } from 'next/navigation';
import Reviews from './Reviews';
import { ScrollArea } from '@/components/ui/scroll-area';
import Ratings from './Ratings';
import { IoIosSearch } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import Container from '@/components/Container';

export function ReviewsDialog({ reviewScores, reviews, isMobile }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    reset,
    getValues,
  } = useForm();
  const [open, setOpen] = useState(false);
  const [searchReview, setSearchReview] = useState('');

  const handleToogleModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleToogleModal}>
        <DialogTrigger asChild>
          <button className='text-black text-xl py-4 px-6 border rounded-lg border-[#222222] bg-white hover:bg-[#F7F7F7] hover:border-black mt-12'>
            Show all {reviews.length} reviews
          </button>
        </DialogTrigger>
        <DialogContent className=' max-w-[95%] md:max-w-[1032px] rounded-md h-[95vh] md:h-[80vh] p-0 overflow-hidden'>
          <div className='hidden px-10 py-10 md:flex flex-col lg:flex-row gap-6'>
            <div className='lg:w-[40%] lg:h-full'>
              <ScrollArea className='hidden lg:block  reviews_dialog_scores w-full'>
                <Ratings inDialog={true} reviewScores={reviewScores} />
              </ScrollArea>
              <div className='w-[80vw] lg:hidden'>
                <Ratings inDialog={true} reviewScores={reviewScores} />
              </div>
            </div>
            <div className='flex-1 lg:w-[60%] lg:h-full'>
              <ScrollArea className='reviews_dialog_reviews h-full w-full'>
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
                      id='reviewsInput'
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
                <Reviews
                  isMobile={isMobile}
                  inDialog={true}
                  reviews={reviews}
                />
              </ScrollArea>
            </div>
          </div>
          <MobileReviews
            reviews={reviews}
            searchReview={searchReview}
            setSearchReview={setSearchReview}
            isMobile={isMobile}
            reviewScores={reviewScores}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

function MobileReviews({
  reviews,
  searchReview,
  setSearchReview,
  isMobile,
  reviewScores,
}) {
  return (
    <div className='md:hidden px-6 py-10'>
      <ScrollArea className='no-scrollbar h-[calc(90vh-40px)] '>
        <div className='w-[calc(95vw-50px)] mb-4'>
          <Ratings inDialog={true} reviewScores={reviewScores} />
        </div>
        <div className='mb-8'>
          <p className='font-semibold text-2xl text-[#222222]'>
            {reviews.length} reviews
          </p>
        </div>
        <div className='sticky -top-[1px] pt-2 pb-6 z-10 bg-white'>
          <div className=' search_reviews flex items-center h-full rounded-full border-2 border-[#b0b0b0] overflow-hidden'>
            <IoIosSearch className='font-semibold w-6 h-6 ml-3' />
            <label htmlFor='reviewsInput' className='src-only'></label>
            <input
              onChange={(e) => setSearchReview(e.target.value)}
              name='reviewsInput'
              type='text'
              id='reviewsInput'
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
  );
}
