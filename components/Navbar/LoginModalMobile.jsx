'use client';
import { useState } from 'react';

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

import React from 'react';

import SignInForm from '@/components/Auth/LoginForm';
import { PiUserCircleLight } from 'react-icons/pi';
import { Button } from '../ui/button';

function LoginModalMobile() {
  //
  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <button className='flex flex-col items-center gap-1 text-[var(--primary-gray)]'>
            <PiUserCircleLight className='w-6 h-6' />
            <span className='text-[0.625rem]'>Login</span>
          </button>
        </DrawerTrigger>
        <DrawerContent className='h-full mt-0'>
          <div className='mx-auto w-full max-w-sm'>
            <DrawerHeader>
              <DrawerTitle>Welcome to Airbnb</DrawerTitle>
              <DrawerDescription>
                Here you can login to your account!
              </DrawerDescription>
            </DrawerHeader>
            <div className='p-4 pb-0'>
              <SignInForm />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default LoginModalMobile;

// <Dialog open={open} onOpenChange={closeModal}>
//     <DialogTrigger asChild>
//       <button className='flex flex-col items-center gap-1 text-[var(--primary-gray)]'>
//         <PiUserCircleLight className='w-6 h-6' />
//         <span className='text-[0.625rem]'>Login</span>
//       </button>
//     </DialogTrigger>
//     <DialogContent className='sm:max-w-xl'>
//       <DialogHeader>
//         <DialogTitle className='text-center pb-4 font-bold text-lg'>
//           Login
//         </DialogTitle>
//         <DropdownMenuSeparator className='bg-[#dddddd]' />
//         <DialogDescription asChild className='mt-2'>
//           <div>
//             <h2 className='text-xl font-bold mt-2 text-black'>
//               Welcome to Airbnb
//             </h2>
//             <p className='my-2'>Here you can login to your account!</p>
//           </div>
//         </DialogDescription>
//       </DialogHeader>
//       <SignInForm />
//     </DialogContent>
//   </Dialog>
