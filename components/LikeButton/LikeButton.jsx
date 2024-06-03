'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { removeFavourite } from '@/app/_actions/actions';
import LoginFormModal from '../Auth/LoginFormModal';

function LikeButton({ children, setOpen, favourite, wishlistID, roomID }) {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleFavourite = () => {
    if (!session.data) {
      // return router.push(`/auth/signin`);
      // return <LoginFormModal />;
    }
    if (!favourite) {
      setOpen(true);
    }

    if (favourite) {
      const data = { wishlistID, roomID };
      removeFavourite(data);
    }
  };

  if (!session.data && pathname.toString() === `/rooms/${roomID}`) {
    return (
      <button
        aria-label='add favourite to wishlist'
        onClick={() => handleFavourite()}
        className={`rounded-full md:rounded-xl p-3 font-semibold underline flex items-center gap-3 hover:bg-[#f7f7f7]
        `}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 22 22'
          strokeWidth={1.5}
          stroke='currentColor'
          className={`text-white fill-black opacity-50 w-6 h-6`}>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
          />
        </svg>
        <span className='hidden sm:inline-block'>Save</span>
      </button>
    );
  }

  return (
    <button
      aria-label='add favourite to wishlist'
      onClick={() => handleFavourite()}
      className={`${
        pathname !== `/rooms/${roomID}`
          ? 'absolute top-3 right-4'
          : 'flex items-center gap-3 rounded-full md:rounded-xl font-semibold underline hover:bg-[#f7f7f7] p-3'
      }`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 22 22'
        strokeWidth={1.5}
        stroke='currentColor'
        className={`${
          pathname !== `/rooms/${roomID}` ? 'w-10 h-10' : 'w-6 h-6'
        }  ${
          favourite ? 'fill-[var(--primary-color)] ' : 'fill-black opacity-50 '
        }text-white`}>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
        />
      </svg>
      {children}
    </button>
  );
}

export default LikeButton;
