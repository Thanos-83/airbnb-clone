'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

import LikeButton from './LikeButton';
import { CreateWishlistDialog } from './CreateWishlistDialog';
import Image from 'next/image';
import { toast } from 'sonner';
import Wishlist from '../wishlist/Wishlist';
import { addFavouriteToWishlist } from '@/app/_actions/actions';
import { usePathname } from 'next/navigation';

export function WishlistsDialog({ info, wishlists }) {
  const pathname = usePathname();
  const [openWishlists, setWishlistsOpen] = useState(false);
  const handleToogleModal = () => {
    setWishlistsOpen(!open);
  };
  // console.log('INFO inside Wishlists Dialog: ', info);
  const handleAddToWishlist = async (wishlist) => {
    // alert(wishlist.id);
    // console.log(wishlist);
    const data = { wishlistID: wishlist._id, favouriteInfo: info };
    const response = await addFavouriteToWishlist(data);

    console.log('Response from add favourite: ', response);
    console.log('handle Add to Wishlist: ', wishlist);
    toast.custom(
      (t) => (
        <div className='z-[999] border-gray-200 border pointer-events-auto w-[340px] flex items-center gap-3 p-4 rounded-lg shadow-md'>
          <Image
            className='rounded-lg w-[60px] aspect-square'
            src={
              response.updatedWishlist.rooms[
                response.updatedWishlist.rooms.length - 1
              ].image
            }
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
      { duration: 10000, position: 'bottom-left' }
    );
  };

  return (
    <Dialog open={openWishlists} onOpenChange={handleToogleModal}>
      {/* <DialogTrigger asChild> */}
      <LikeButton setOpen={setWishlistsOpen} favourite={false} roomID={info.id}>
        {pathname === `/rooms/${info.id}` && (
          <span className='hidden md:inline-block'>Save</span>
        )}
      </LikeButton>

      {/* </DialogTrigger> */}
      <DialogContent className='w-[90%] block rounded-lg max-h-[90dvh] max-h-[90vh] h-fit sm:max-w-[740px] overflow-y-auto p-0'>
        <div>
          <h2 className='p-4 text-xl text-center text-[#222222] font-[600]'>
            Add to Wishlist
          </h2>
        </div>
        <hr className='h-[2px] bg-slate-100' />
        <div className='no-scrollbar max-h-[700px]  py-4 overflow-y-auto px-4 sm:px-8 grid items-start grid-cols-2 xl:grid-cols-3 gap-4'>
          {wishlists.map((wishlist) => (
            <button
              aria-label='add favourite to wishlist'
              onClick={() => handleAddToWishlist(wishlist)}
              className='text-start'
              key={wishlist._id}>
              <Wishlist wishlist={wishlist} />
            </button>
          ))}
        </div>
        <hr className='h-[2px] mt-4 bg-slate-100' />
        <div className='py-4 px-8 flex items-center justify-between'>
          <CreateWishlistDialog
            setWishlistsOpen={setWishlistsOpen}
            asButton={true}
            favouriteInfo={info}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
