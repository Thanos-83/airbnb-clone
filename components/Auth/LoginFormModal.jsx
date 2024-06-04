'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import LikeButton from '@/components/LikeButton/LikeButton';
// import LoginForm from './LoginForm';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import SignInForm from '@/components/Auth/LoginForm';
import { usePathname } from 'next/navigation';

function LoginFormModal({ inDropdown, label }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const handleToogleModal = () => {
    setOpen(!open);
    // setLoginOpen(!openLoginModal);
  };

  return (
    <Dialog open={open} onOpenChange={handleToogleModal}>
      <DialogTrigger asChild>
        <button
          aria-label='add favourite to wishlist'
          className={`${
            !pathname.split('/').includes('rooms') && !inDropdown
              ? 'absolute top-3 right-4'
              : 'flex  items-center w-full gap-3 hover:bg-[#f1f5f9] p-3'
          } ${
            !inDropdown &&
            'rounded-full md:rounded-xl    font-semibold underline'
          }`}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 22 22'
            strokeWidth={1.5}
            stroke='currentColor'
            className={`${
              inDropdown ? 'hidden' : 'inline-block'
            } fill-black opacity-50 text-white ${
              !pathname.split('/').includes('rooms') ? 'w-10 h-10' : 'w-6 h-6'
            }`}>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
            />
          </svg>
          <span className={`${!inDropdown && 'hidden md:inline'}`}>
            {label}
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className='max-h-[90%] rounded-xl w-[90%] sm:w-[80%] md:max-w-xl'>
        <DialogHeader>
          <DialogTitle className='text-center pb-4 font-bold text-lg'>
            Login
          </DialogTitle>
          <DropdownMenuSeparator className='bg-[#dddddd]' />
        </DialogHeader>
        <SignInForm />
      </DialogContent>
    </Dialog>
  );
}

export default LoginFormModal;
