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
import { toast } from 'sonner';

import Image from 'next/image';
import Link from 'next/link';
import { updateRoomNote } from '@/app/_actions/actions';
import { Loader2 } from 'lucide-react';

export function AddNoteToWishlist({ house, wishlistID, roomID }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    reset,
    getValues,
  } = useForm();
  const [open, setOpen] = useState(false);
  const [noteLength, setNoteLength] = useState(0);
  const handleToogleModal = () => {
    setOpen(!open);
  };

  const handleAddNoteToWishlist = async (data) => {
    console.log('Data: ', data);
    const response = await updateRoomNote(data);
    console.log('Response from server action: ', response);
    reset();
    setOpen(false);
    // setSettingsOpen(false);
    toast.success(`Note added successfuly!`, {
      position: 'bottom-left',
    });
    setNoteLength(0);
  };

  const handleCancel = () => {
    reset();
    setNoteLength(0);

    // setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleToogleModal}>
        <DialogTrigger asChild>
          <button className='bg-[#F7F7F7] text-[#717171] p-4 rounded-xl hover:text-[#222222] font-semibold text-lg underline w-full text-left'>
            Add note
          </button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[800px] p-0'>
          <DialogHeader asChild>
            <h2 className='p-4 text-xl text-center text-[#222222] font-[600]'>
              Add Note
            </h2>
          </DialogHeader>
          <hr className='h-[2px] bg-slate-100' />
          <div className='flex items-center gap-8 px-8 max-h-[400px] overflow-y-auto'>
            <div className='rounded-xl overflow-hidden w-1/2'>
              <Link href={`/rooms/${house._id}`} target='_blank'>
                <Image
                  src={house.image}
                  width={400}
                  height={400}
                  alt={house.name}
                  className='aspect-square object-cover'
                />
              </Link>
            </div>
            <div className='flex flex-col h-full w-1/2'>
              <div className='flex items-start justify-between'>
                <p className='text-[#222222] flex-1 font-[600] '>
                  {' '}
                  {house.name}
                </p>
                <p className='text-[#222222] flex items-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-6 h-6 fill-[#222222]'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
                    />
                  </svg>
                  <span>5.0 ({house.number_of_reviews})</span>
                </p>
              </div>
              <div>
                <p>{house.beds} beds</p>
              </div>
              <form
                className='flex-1 flex flex-col mt-6'
                id='add-note'
                onSubmit={handleSubmit(handleAddNoteToWishlist)}>
                <Label htmlFor='name' className='text-right sr-only'>
                  Wishlist Name
                </Label>
                <Textarea
                  {...register('note', {
                    required: 'Note is required',
                    maxLength: {
                      value: 250,
                      message: 'Over character limit',
                    },
                  })}
                  placeholder='Add note'
                  name='note'
                  id='note'
                  className='h-full border-[#b0b0b0] border-2 rounded-lg'
                  onChange={(e) => setNoteLength(e.target.value.length)}
                />
                <input
                  type='hidden'
                  name='wishlistID'
                  id='wishlistID'
                  hidden
                  value={wishlistID}
                  {...register('wishlistID')}
                />
                <input
                  type='hidden'
                  name='roomID'
                  id='roomID'
                  hidden
                  value={roomID}
                  {...register('roomID')}
                />
                <div className='mt-3 flex items-center justify-between'>
                  <p className=' text-md text-muted-foreground'>
                    {noteLength}/250 characters
                  </p>
                  {errors.note && (
                    <small className='font-semibold text-red-600'>
                      {errors.note.message}
                    </small>
                  )}
                </div>
              </form>
            </div>
          </div>
          <hr className='h-[2px] bg-slate-100' />
          <div className='py-4 px-8 flex items-center justify-between'>
            <Button
              type='button'
              disabled={noteLength === '' && true}
              onClick={() => handleCancel()}
              className='py-[1.75rem] w-[120px] rounded-lg text-lg px-4 font-[600] bg-white text-[#222222] hover:bg-slate-100'>
              Cancel
            </Button>
            <Button
              form='add-note'
              className={`py-[1.75rem] w-[120px] rounded-lg text-lg px-10 font-[600] ${
                noteLength === 0 &&
                'pointer-events-none cursor-not-allowed	 bg-slate-200'
              }`}
              type='submit'
              disabled={isSubmitting || noteLength === 0}>
              {isSubmitting ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
