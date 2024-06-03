'use client';
import LoginFormModal from '@/components/Auth/LoginFormModal';
import { CreateWishlistDialog } from '@/components/LikeButton/CreateWishlistDialog';
import LikeButton from '@/components/LikeButton/LikeButton';
import { WishlistsDialog } from '@/components/LikeButton/WishlistsDialog';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

function House({ house, wishlists, isFavourite, favourite }) {
  const session = useSession();

  // console.log('Is house favourite: ', isFavourite);
  const favouriteInfo = {
    id: house._id.toString(),
    image: house.images.picture_url,
    name: house.name,
    price: parseFloat(house.price.toString()),
    coordinates: {
      long: house.address.location.coordinates[0],
      lat: house.address.location.coordinates[1],
    },
    beds: house.beds,
    number_of_reviews: house.number_of_reviews,
  };

  return (
    <div>
      <div className='rounded-xl overflow-hidden aspect-square relative'>
        {/* <p className='z-[999]'>{house._id}</p> */}
        <Link href={`/rooms/${house._id}`}>
          <Image
            src={house.images.picture_url}
            width={600}
            height={600}
            alt={house.name}
            className='aspect-square object-cover'
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP88R8AAvUB+VkkrXoAAAAASUVORK5CYII='
          />
          <p className='absolute top-3 left-4 text-[#222222] font-[600] bg-white rounded-full py-1 px-3'>
            Guest favourite
          </p>
        </Link>
        {!session?.data ? (
          <LoginFormModal label='' />
        ) : isFavourite ? (
          <LikeButton
            favourite={true}
            wishlistID={favourite.wishlist_id}
            roomID={house._id.toString()}
          />
        ) : wishlists && wishlists.length > 0 ? (
          <WishlistsDialog
            info={favouriteInfo}
            wishlists={JSON.parse(JSON.stringify(wishlists))}
          />
        ) : (
          <CreateWishlistDialog
            asButton={false}
            favouriteInfo={favouriteInfo}
          />
        )}
      </div>
      <div className='mt-4'>
        <div className='flex items-center justify-between'>
          <p className='text-[#222222] flex-1 font-[600] '>
            {house.address.suburb}, <span>{house.address.market}</span>
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
            {house.number_of_reviews > 0 ? (
              <span>
                {house.review_scores &&
                  Number(
                    (house.review_scores.review_scores_rating / 2) * 0.1
                  ).toFixed(2)}
              </span>
            ) : (
              <span className='font-semibold text-[1.25rem]'>New</span>
            )}
          </p>
        </div>
        <div className='mt-2 flex items-center gap-1'>
          <p className='text-[#222222] font-[600]'>€</p>
          <p className='text-[#222222] font-[600]'>{house.price.toString()}</p>
          <span>/</span>
          <p>night</p>
        </div>
      </div>
    </div>
  );
}

export default House;
