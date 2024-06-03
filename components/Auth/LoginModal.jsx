'use client';
import React, { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

import { AiOutlineMenu } from 'react-icons/ai';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import LoginFormModal from './LoginFormModal';

export function LoginModal({ session }) {
  // const session = useSession()
  // console.log('Session from LoginModal: ', session);
  const [open, setOpen] = useState(false);
  //  const [nameLength, setNameLength] = useState(0);
  //  const pathname = usePathname();
  const handleToogleModal = () => {
    setOpen(!open);
  };

  return (
    <div>
      <DropdownMenu open={open} onOpenChange={handleToogleModal}>
        <DropdownMenuTrigger className='outline-none border rounded-full shadow-none hover:shadow-lg transition'>
          <div className='flex items-center gap-4  px-4 pr-2 py-2'>
            <AiOutlineMenu />
            <Avatar>
              <AvatarImage src={session?.user ? session?.user.image : null} />
              <AvatarFallback className='bg-slate-400 text-slate-50'>
                GS
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='py-2 space-y-1 w-[220px]'>
          {session?.user ? (
            <>
              <DropdownMenuItem className='pt-2 px-3 w-full text-lg'>
                <p className='text-[#222222] font-semibold'>Messages</p>
              </DropdownMenuItem>
              <DropdownMenuItem className='pt-2 px-3 w-full text-lg'>
                <p className='text-[#222222] font-semibold relative'>
                  Trips{' '}
                  {session.user.reservations.length > 0 && (
                    <span className='absolute -top-1 -right-6 rounded-full bg-red-600 text-white text-sm py-[1px] px-2'>
                      {session.user.reservations.length}
                    </span>
                  )}
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='pt-2 px-3 w-full text-lg'>
                <Link
                  href='/wishlists'
                  className='text-[#222222] font-semibold'>
                  Wishlists
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='px-3 pb-4 w-full text-lg'>
                <button onClick={() => signOut()}>Logout</button>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem
                asChild
                className='px-3 pb-2 w-full text-lg cursor-pointer'>
                {/* <Link href='/auth/signin'>Login</Link> */}
                <LoginFormModal inDropdown={true} label='Login' />
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className='px-3 pb-2 w-full text-lg cursor-pointer'>
                <Link
                  className='pointer-events-none text-gray-300 cursor-not-allowed'
                  href='/auth/signup'>
                  Register
                </Link>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator className='h-[2px] bg-[#dddddd]' />
          <DropdownMenuItem className='pt-4 px-3 w-full text-lg'>
            Gift Cards
          </DropdownMenuItem>
          <DropdownMenuItem className='px-3 w-full text-lg'>
            Airbnb your home
          </DropdownMenuItem>
          <DropdownMenuItem className='px-3 w-full text-lg'>
            Help Center
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
