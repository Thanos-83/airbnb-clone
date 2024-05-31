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
import { updateWishlistName } from '@/app/_actions/actions';
import { toast } from 'sonner';
import { MdModeEdit } from 'react-icons/md';
import { LiaAngleRightSolid } from 'react-icons/lia';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Loader2 } from 'lucide-react';

export function RenameWishlistDialog({ setSettingsOpen, wishlistInfo }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    reset,
    getValues,
  } = useForm();
  const [open, setOpen] = useState(false);
  const [nameLength, setNameLength] = useState(
    wishlistInfo.wishlistName.length
  );
  const [wishlistName, setWishlistName] = useState(wishlistInfo.wishlistName);
  const handleToogleModal = () => {
    setOpen(!open);
  };

  const handleWishlist = async (data) => {
    console.log('Data: ', data);
    const response = await updateWishlistName(data);
    // console.log('Response from server action: ', response);
    reset();
    setOpen(false);
    setSettingsOpen(false);
    toast.success(`Wishlist renamed successfuly!`, {
      position: 'bottom-left',
    });
  };

  const handleRenameWishlist = (e) => {
    setNameLength(e.target.value.length);
    setWishlistName(e.target.value);
  };

  const handleCancel = () => {
    reset();
    setWishlistName(wishlistInfo.wishlistName);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleToogleModal}>
        <DialogTrigger asChild>
          <button className='py-4 flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <MdModeEdit />
              <span>Rename</span>
            </div>
            <LiaAngleRightSolid />
          </button>
        </DialogTrigger>
        <DialogContent className='gap-0 max-h-[80svh] w-[90%] rounded-lg sm:max-w-[500px] p-0'>
          <DialogHeader asChild>
            <h2 className='p-4 text-xl text-center text-[#222222] font-[600]'>
              Rename Wishlist
            </h2>
          </DialogHeader>
          <hr className='h-[2px] mb-4 bg-slate-100' />
          <form
            className='max-h-[calc(80svh-150px)] overflow-y-auto pt-2'
            onSubmit={handleSubmit(handleWishlist)}>
            <div className='px-8'>
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
                  // onFocus={(e) => wishlistInfo.wishlistName.length}
                  defaultValue={wishlistName}
                  onChange={(e) => handleRenameWishlist(e)}
                />
                <input
                  type='hidden'
                  name='wishlistID'
                  id='wishlistID'
                  hidden
                  value={wishlistInfo._id}
                  {...register('wishlistID')}
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
                type='button'
                onClick={() => handleCancel()}
                className='py-[1.75rem] w-[125px] rounded-lg text-lg px-4 font-[600] bg-white text-[#222222] hover:bg-slate-100'>
                Cancel
              </Button>
              <Button
                className={`py-[1.75rem] w-[125px] rounded-lg text-lg px-10 font-[600] ${
                  isSubmitting && 'cursor-not-allowed'
                }`}
                type='submit'
                disabled={
                  isSubmitting || wishlistName === wishlistInfo.wishlistName
                }>
                {isSubmitting ? (
                  <Loader2 className=' h-4 w-4 animate-spin' />
                ) : (
                  'Save'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
