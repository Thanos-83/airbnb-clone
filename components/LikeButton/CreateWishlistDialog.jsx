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

import LikeButton from './LikeButton';
import { useForm } from 'react-hook-form';
import { handleWishlistAction } from '@/app/_actions/actions';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export function CreateWishlistDialog({ asButton, favouriteInfo }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    reset,
    getValues,
  } = useForm();
  const [open, setOpen] = useState(false);
  const [nameLength, setNameLength] = useState(0);
  const pathname = usePathname();
  const handleToogleModal = () => {
    setOpen(!open);
  };

  const handleWishlist = async (data) => {
    console.log('Data: ', data);
    const wishlistInfo = { wishlistName: data.name, favouriteInfo };
    const response = await handleWishlistAction(wishlistInfo);
    console.log('Response from server action: ', response);
    reset();
    setOpen(false);
    // setWishlistsOpen(false);
    toast.success(`Wishlist has been created`, {
      position: 'bottom-left',
    });
  };

  // console.log('Create wishlist dialog: ', favouriteInfo);

  return (
    <>
      <Dialog open={open} onOpenChange={handleToogleModal}>
        <DialogTrigger asChild>
          {asButton ? (
            <Button
              className='w-full py-[1.75rem] rounded-lg text-lg px-10 font-[600]'
              type='submit'>
              Create new wishlist
            </Button>
          ) : (
            <LikeButton setOpen={setOpen} favourite={false} />
          )}
        </DialogTrigger>
        <DialogContent className='w-[90%] rounded-lg sm:max-w-[740px] p-0'>
          <DialogHeader asChild>
            <h2 className='p-4 text-xl text-center text-[#222222] font-[600]'>
              Create Wishlist
            </h2>
          </DialogHeader>
          <hr className='h-[2px] bg-slate-100' />
          <form onSubmit={handleSubmit(handleWishlist)}>
            <div className='py-4 px-4 sm:px-8'>
              <div className=''>
                <Label htmlFor='name' className='text-right sr-only'>
                  Wishlist Name
                </Label>
                <Textarea
                  {...register('name', {
                    required: 'Name is required',
                    maxLength: {
                      value: 50,
                      message: 'Over character limit',
                    },
                  })}
                  placeholder='Wishlist Name'
                  name='name'
                  id='name'
                  onChange={(e) => setNameLength(e.target.value.length)}
                />

                <div className='mt-3 flex items-center justify-between'>
                  <p className=' text-md text-muted-foreground'>
                    {nameLength}/50 characters
                  </p>
                  {errors.name && (
                    <small className='font-semibold text-red-600'>
                      {errors.name.message}
                    </small>
                  )}
                </div>
              </div>
            </div>
            <hr className='h-[2px] mt-4 bg-slate-100' />
            <div className='py-4 px-8 flex items-center justify-between'>
              <Button
                onClick={() => reset()}
                className='py-[1.75rem] w-[120px] rounded-lg text-lg px-4 font-[600] bg-white text-[#222222] hover:bg-slate-100'>
                Clear
              </Button>
              <Button
                className='py-[1.75rem] w-[120px] rounded-lg text-lg px-10 font-[600]'
                type='submit'
                disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                  'Create'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
