'use client';
import { CreateWishlistDialog } from '@/components/LikeButton/CreateWishlistDialog';
import { WishlistsDialog } from '@/components/LikeButton/WishlistsDialog';
import Image from 'next/image';
import Link from 'next/link';
import { AddNoteToWishlist } from './AddNoteToWishlist';
import { EditNote } from './EditNote';
import LikeButton from '@/components/LikeButton/LikeButton';
import EditNoteMobile from './EditNoteMobile';
import AddNoteMobile from './AddNoteMobile';

function WishlistItem({ house, wishlist }) {
  return (
    <div className='flex flex-col '>
      <div className='flex-1'>
        <div className='rounded-xl flex-1 overflow-hidden aspect-square relative'>
          <Link href={`/rooms/${house.id}`} target='_blank'>
            <Image
              src={house.image}
              width={600}
              height={600}
              alt={house.name}
              className='aspect-square object-cover'
            />
            <p className='absolute top-3 left-4 text-[#222222] font-[600] bg-white rounded-full py-1 px-3'>
              Guest favourite
            </p>
          </Link>
          <LikeButton
            favourite={true}
            wishlistID={wishlist._id.toString()}
            roomID={house.id.toString()}
          />
        </div>
        <div className='mt-4'>
          <div className='flex items-center justify-between'>
            <p className='text-[#222222] flex-1 font-[600] '> {house.name}</p>
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
          <div className='mt-2 flex items-center gap-1'>
            <p className='text-[#222222] font-[600]'>€</p>
            <p className='text-[#222222] font-[600]'>
              {house.price.toString()}
            </p>
            <span>/</span>
            <p>night</p>
          </div>
        </div>
      </div>
      <div className='hidden sm:block mt-4'>
        {house.note !== '' ? (
          <EditNote
            house={house}
            wishlistID={wishlist._id.toString()}
            roomID={house._id.toString()}
          />
        ) : (
          <AddNoteToWishlist
            house={house}
            wishlistID={wishlist._id.toString()}
            roomID={house._id.toString()}
          />
        )}
      </div>

      <div className='block sm:hidden mt-4'>
        {house?.note !== '' ? (
          <div className='bg-[#F7F7F7] text-[#717171] p-4 rounded-xl'>
            <p>{house.note}</p>

            <EditNoteMobile
              house={house}
              wishlistID={wishlist._id.toString()}
              roomID={house._id.toString()}
            />
          </div>
        ) : (
          <div className='bg-[#F7F7F7] text-[#717171] p-4 rounded-xl'>
            <AddNoteMobile
              house={house}
              wishlistID={wishlist._id.toString()}
              roomID={house._id.toString()}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default WishlistItem;
