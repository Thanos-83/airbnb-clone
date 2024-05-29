'use client';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { deleteWishlist } from '@/app/_actions/actions';

function DeleteButton({ id }) {
  const handleDeleteWishlist = async () => {
    setIsDeleting(true);
    await deleteWishlist(id);
    setIsDeleting(false);
  };
  return (
    <button
      onClick={() => handleDeleteWishlist()}
      className='delete_wishlist_btn hidden group-hover:block group-hover:pointer-events-auto absolute top-6 left-6 rounded-full bg-white p-2'>
      <IoClose className='w-6 h-6' />
    </button>
  );
}

export default DeleteButton;
