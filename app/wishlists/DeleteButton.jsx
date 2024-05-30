'use client';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { deleteWishlist } from '@/app/_actions/actions';
import { Loader } from 'lucide-react';

function DeleteButton({ id }) {
  const [isDeleding, setIsDeleting] = useState(false);
  const handleDeleteWishlist = async () => {
    setIsDeleting(true);
    await deleteWishlist(id);
    setIsDeleting(false);
  };
  return (
    <button
      onClick={() => handleDeleteWishlist()}
      className={`delete_wishlist_btn  hidden group-hover:block group-hover:pointer-events-auto absolute top-6 left-6 rounded-full ${
        isDeleding
          ? 'bg-[var(--secondary-gray)] cursor-not-allowed'
          : 'bg-white'
      } p-2`}>
      {isDeleding ? (
        <Loader className='animate-spin w-6 h-6' />
      ) : (
        <IoClose className='w-6 h-6' />
      )}
    </button>
  );
}

export default DeleteButton;
