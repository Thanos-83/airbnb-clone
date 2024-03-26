
'use client'
import {useState} from 'react'


import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import React from 'react'
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { useRouter } from 'next/navigation';
import RegisterForm from '@/components/Auth/RegisterForm';

function RegisterDialogPage() {
    const router = useRouter()

    const [open, setOpen] = useState(true)

    const closeModal = ()=>{
        setOpen(!open)
        router.back()
    }
  return (
    <div>
       <Dialog
        open={open}
        onOpenChange={closeModal}>
        <DialogContent className='sm:max-w-xl'>
        <DialogHeader>
            <DialogTitle className='text-center pb-4 font-bold text-lg'>Register</DialogTitle>
            <DropdownMenuSeparator className='bg-[#dddddd]'/>
            <DialogDescription className='mt-2'>
              <h2 className='text-xl font-bold mt-2 text-black'>Welcome to Airbnb</h2>
              <p className='my-2'>Here you can create your account!</p>
            </DialogDescription>
        </DialogHeader>
        <RegisterForm/>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default RegisterDialogPage
