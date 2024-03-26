'use client';
import React, { useState } from 'react';


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"


import { AiOutlineMenu } from 'react-icons/ai';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react'



export function LoginModal({session}) {
// const session = useSession()
// console.log('Session from LoginModal: ', session);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className='outline-none border rounded-full shadow-none hover:shadow-lg transition'>
          <div className='flex items-center gap-4  px-4 pr-2 py-2'>
            <AiOutlineMenu />
            <Avatar>
              <AvatarImage src={session?.user ? session?.user.image : null} />
              <AvatarFallback className="bg-slate-400 text-slate-50">GS</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='py-2 space-y-1 w-[220px]'>
          {session?.user  ?
            <>
              <DropdownMenuItem className='pt-2 px-3 w-full text-lg'>
                <p className='text-[#222222] font-semibold'>Messages</p>
              </DropdownMenuItem>
              <DropdownMenuItem className='pt-2 px-3 w-full text-lg'>
                <p className='text-[#222222] font-semibold'>Trips</p>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='pt-2 px-3 w-full text-lg'>
                <Link href='/wishlists' className='text-[#222222] font-semibold'>Wishlists</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='px-3 pb-4 w-full text-lg'>
                <button onClick={()=>signOut()}>
                  Logout
                </button>
              </DropdownMenuItem>
            </>
              :
          <>
          <DropdownMenuItem 
          asChild
            className='px-3 pb-4 w-full text-lg'
          >
            <Link href='/auth/signin'>Login</Link>
          </DropdownMenuItem>
          <DropdownMenuItem 
            asChild
            className='px-3 pb-4 w-full text-lg'
          >
            <Link href='/auth/signup'>Register</Link>
          </DropdownMenuItem>
          </>
          }
          <DropdownMenuSeparator className='h-[2px] bg-[#dddddd]'/>
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
