'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';

import LikeButton from './LikeButton';
import { CreateWishlistDialog } from './CreateWishlistDialog';
import Image from 'next/image';
import { toast } from 'sonner';
import Wishlist from '../wishlist/Wishlist';
import { addFavouriteToWishlist } from '@/app/_actions/actions';

export function WishlistsDialog({ info, wishlists }) {
  const [openWishlists, setWishlistsOpen] = useState(false);
  const handleToogleModal = () => {
    setWishlistsOpen(!open);
  };
  // console.log('INFO: ', info);
  const handleAddToWishlist = async (wishlist) => {
    // alert(wishlist.id);
    // console.log(wishlist);
    const data = { wishlistID: wishlist._id, favouriteInfo: info };
    const response = await addFavouriteToWishlist(data);
    toast.custom(
      (t) => (
        <div className='z-[999] border-gray-200 border pointer-events-auto w-[340px] flex items-center gap-3 p-4 rounded-lg shadow-md'>
          <Image
            className='rounded-lg w-[60px] aspect-square'
            src={wishlist.rooms[0].image}
            width={60}
            height={60}
            alt={wishlist.wishlistName}
          />
          <div className='flex-1 flex justify-between'>
            <p className='text-lg'>
              Saved to{' '}
              <span className='text-[#222222] font-semibold'>
                {wishlist.wishlistName}
              </span>
            </p>
            <button onClick={() => toast.dismiss(t)}>close</button>
          </div>
        </div>
      ),
      { duration: 100000, position: 'bottom-left' }
    );
  };

  return (
    <Dialog open={openWishlists} onOpenChange={handleToogleModal}>
      {/* <DialogTrigger asChild> */}
      <LikeButton setOpen={setWishlistsOpen} />
      {/* </DialogTrigger> */}
      <DialogContent className='sm:max-w-[640px] p-0'>
        <DialogHeader asChild>
          <h2 className='p-4 text-xl text-center text-[#222222] font-[600]'>
            Add to Wishlist {info.id}{' '}
          </h2>
        </DialogHeader>
        <hr className='h-[2px] bg-slate-100' />
        <div className='max-h-[400px] overflow-y-auto px-8 grid grid-cols-2 gap-4'>
          {wishlists.map((wishlist) => (
            <button
              onClick={() => handleAddToWishlist(wishlist)}
              className='text-start'
              key={wishlist._id}>
              <Wishlist wishlist={wishlist} />
            </button>
          ))}
        </div>
        <hr className='h-[2px] mt-4 bg-sl ate-100' />
        <div className='py-4 px-8 flex items-center justify-between'>
          <CreateWishlistDialog
            setWishlistsOpen={setWishlistsOpen}
            asButton={true}
            info={info}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
