'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function LikeButton({ setOpen }) {
  const session = useSession();
  const router = useRouter();
  // console.log('House ID: ',houseID);

  const handleFavourite = () => {
    if (!session.data) {
      return router.push(`/auth/signin`);
    }
    setOpen(true);
  };
  return (
    <button
      onClick={() => handleFavourite()}
      className=' absolute top-3 right-4 flex'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 22 22'
        strokeWidth={1.5}
        stroke='currentColor'
        className={`w-10 h-10  ${
          false ? 'fill-[var(--primary-color)] ' : 'fill-black opacity-50 '
        }text-white`}>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
        />
      </svg>
    </button>
  );
}

export default LikeButton;
