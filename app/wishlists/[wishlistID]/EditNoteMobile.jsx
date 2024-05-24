'use client';
import React, { useState } from 'react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { IoClose } from 'react-icons/io5';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { updateRoomNote } from '@/app/_actions/actions';

function EditNoteMobile({ house, wishlistID, roomID }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    reset,
    getValues,
  } = useForm();
  const [noteLength, setNoteLength] = useState(0);
  const [noteValue, setNoteValue] = useState(house.note);
  const handleEditNote = async (data) => {
    console.log('Data: ', data);
    const response = await updateRoomNote(data);
    console.log('Response from server action: ', response);
    if (response) {
      setNoteValue(response.roomNote);
    }
    reset();
    // setOpen(false);
    // setSettingsOpen(false);
    toast.success(`Note added successfuly!`, {
      position: 'top-left',
    });
    setNoteLength(0);
  };

  const handleCancel = () => {
    reset();
  };

  const handleNote = (e) => {
    setNoteLength(e.target.value.length);
    setNoteValue(e.target.value);
  };

  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <button className='text-[#717171] hover:text-[#222222] font-semibold text-lg underline'>
            Edit note
          </button>
        </DrawerTrigger>
        <DrawerContent className='mt-0'>
          <div className='mx-auto w-full'>
            <DrawerHeader className='relative'>
              <DrawerClose asChild>
                <button className='absolute top-4 left-4'>
                  <IoClose className='w-6 h-6' />
                </button>
              </DrawerClose>
              <DrawerTitle>Notes</DrawerTitle>
            </DrawerHeader>
            <div className='p-4 flex flex-col h-full'>
              <form
                className='flex-1 flex flex-col'
                id='add-note'
                onSubmit={handleSubmit(handleEditNote)}>
                <Label htmlFor='name' className='text-right sr-only'>
                  Wishlist Name
                </Label>
                <Textarea
                  {...register('note', {
                    maxLength: {
                      value: 250,
                      message: 'Over character limit',
                    },
                  })}
                  placeholder='Edit note'
                  name='note'
                  id='note'
                  className='h-full bg-[#F7F7F7] border-[#b0b0b0] border-2 rounded-lg'
                  defaultValue={noteValue}
                  onChange={(e) => handleNote(e)}
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
                <div className='mt-1 flex items-center justify-between'>
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

            <hr className='h-[2px] bg-slate-100' />
            <div className='p-4 flex items-center justify-between'>
              <Button
                type='button'
                disabled={noteLength === '' && true}
                onClick={() => handleCancel()}
                className='py-[1.75rem] rounded-lg text-lg px-4 font-[600] bg-white text-[#222222] hover:bg-slate-100'>
                Cancel
              </Button>
              <Button
                form='add-note'
                className={`py-[1.75rem] rounded-lg text-lg px-10 font-[600] ${
                  house.note === noteValue &&
                  'pointer-events-none cursor-not-allowed	 bg-slate-200'
                }`}
                type='submit'
                // disabled={noteLength === 0}
              >
                {isSubmitting ? 'Editing' : 'Edit'}
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default EditNoteMobile;
