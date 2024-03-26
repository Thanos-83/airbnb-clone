'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';

import { BsThreeDots } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';
import { LiaAngleRightSolid } from 'react-icons/lia';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { RenameWishlistDialog } from './RenameWishlistDialog';
import { DeleteWishlistDialog } from './DeleteWishlistDialog';

export function WishlistSettings({ wishlistInfo }) {
  const [openSettings, setSettingsOpen] = useState(false);
  const handleToogleSettingsModal = () => {
    setSettingsOpen(!openSettings);
  };

  return (
    <>
      <Dialog open={openSettings} onOpenChange={handleToogleSettingsModal}>
        <DialogTrigger asChild>
          <button className='rounded-full hover:bg-black hover:bg-opacity-5 p-3'>
            <BsThreeDots className='h-6 w-6' />
          </button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[500px] p-4'>
          <DialogHeader asChild>
            <h2 className=' text-xl text-center text-[#222222] font-[600]'>
              Settings
            </h2>
          </DialogHeader>
          <RenameWishlistDialog
            setSettingsOpen={setSettingsOpen}
            wishlistInfo={wishlistInfo}
          />
          <hr className='h-[2px] bg-slate-100' />
          <DeleteWishlistDialog wishlistInfo={wishlistInfo} />
        </DialogContent>
      </Dialog>
    </>
  );
}
