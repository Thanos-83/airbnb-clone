'use client';
import { useState } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import React from 'react';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/navigation';
import SignInForm from '@/components/Auth/LoginForm';

export const dynamic = 'force-static';

function LoginDialogPage() {
  const router = useRouter();
  // console.log('Router: ', router);
  const [open, setOpen] = useState(true);

  const closeModal = () => {
    setOpen(!open);
    router.back();
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={closeModal}>
        <DialogTrigger asChild>
          <button>Edit Profile</button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-xl'>
          <DialogHeader>
            <DialogTitle className='text-center pb-4 font-bold text-lg'>
              Login
            </DialogTitle>
            <DropdownMenuSeparator className='bg-[#dddddd]' />
            <DialogDescription className='mt-2'>
              <h2 className='text-xl font-bold mt-2 text-black'>
                Welcome to Airbnb
              </h2>
              <p className='my-2'>Here you can login to your account!</p>
            </DialogDescription>
          </DialogHeader>
          <SignInForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LoginDialogPage;
