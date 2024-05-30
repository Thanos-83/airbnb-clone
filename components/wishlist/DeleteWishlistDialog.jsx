'use client';
import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { LiaAngleRightSolid } from 'react-icons/lia';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { RiDoubleQuotesL } from 'react-icons/ri';
import { RiDoubleQuotesR } from 'react-icons/ri';
import { deleteWishlist } from '@/app/_actions/actions';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export function DeleteWishlistDialog({ wishlistInfo }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const handleToogleModal = () => {
    setOpen(!open);
  };

  const handleDeleteWishlist = async (id) => {
    startTransition(() => deleteWishlist(id));
    router.push('/wishlists');
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleToogleModal}>
        <DialogTrigger asChild>
          <button className='py-4 flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <RiDeleteBin5Line />
              <span>Delete</span>
            </div>
            <LiaAngleRightSolid />
          </button>
        </DialogTrigger>
        <DialogContent className='max-h-[80svh] overflow-y-auto w-[90%]  rounded-lg sm:max-w-[500px] p-0'>
          <div className='flex flex-col items-center text-center p-8 mt-8 max-w-[300px] mx-auto'>
            <h2 className='text-[#222222] font-semibold text-xl mb-2'>
              Delete this wishlist?
            </h2>
            <p className=' text-[#717171] '>
              <span className='relative inline'>
                <RiDoubleQuotesL className='w-2 h-2 absolute -left-2 top-0' />
                {wishlistInfo.wishlistName}
                <RiDoubleQuotesR className='w-2 h-2 absolute top-0 -right-2' />
              </span>
              <span className='ml-3 inline'>will be permanently deleted</span>
            </p>
          </div>

          <hr className='h-[2px] mt-4 bg-slate-100' />
          <div className='py-4 px-8 flex items-center justify-between'>
            <Button
              className='py-[1.75rem] w-[125px] rounded-lg text-lg px-4 font-[600] bg-white text-[#222222] hover:bg-slate-100'
              onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => handleDeleteWishlist(wishlistInfo._id)}
              className={`py-[1.75rem] w-[125px] rounded-lg text-lg px-10 font-[600]  ${
                isPending && 'cursor-not-allowed'
              }`}
              type='submit'
              disabled={isPending}>
              {isPending ? <Loader2 /> : 'Delete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
