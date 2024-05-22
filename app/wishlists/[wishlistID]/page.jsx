import Container from '@/components/Container';
import React from 'react';
import TopBar from './TopBar';
import MapBox from './MapBox';
import { fetchSingleWishlist } from '@/lib/helpers';
import BookingActions from './BookingActions';
import WishlistItem from './WishlistItem';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

async function SingleWishlist({ params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/auth/signin');
  }

  const { wishlist } = await fetchSingleWishlist(params.wishlistID);

  // console.log('Single Wishlist: ', typeof wishlist.rooms[0]);
  return (
    <main className='flex gap-8 items-start'>
      <section className='w-full lg:w-[60%] xl:w-[50%] 2xl:w-[60%] 4xl:w-[40%] px-4 lg:pl-8 pb-12'>
        <TopBar wishlistInfo={wishlist} />
        <h1 className='mb-8 text-3xl font-semibold text-[#222222]'>
          {wishlist.wishlistName}
        </h1>
        <BookingActions />
        <div className='my-12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3 gap-8'>
          {wishlist.rooms.length > 0 ? (
            wishlist.rooms.map((room) => (
              <WishlistItem
                key={room._id.toString()}
                house={room}
                wishlist={wishlist}
              />
            ))
          ) : (
            <div className='col-span-full'>
              <h2 className='text-2xl font-medium'>No saves yet!</h2>
              <p className='my-8'>
                As you search, click the heart icon to save your favourite
                places and Experiences to a wishlist.
              </p>
              <Link
                href='/'
                className='rounded-xl text-xl text-white font-medium bg-black py-6 px-8 '>
                Start expoloring
              </Link>
            </div>
          )}
        </div>
      </section>
      <section className='hidden lg:block lg:w-[40%] xl:w-[50%] 2xl:w-[40%] 4xl:w-[60%] h-[calc(100vh-96px)] sticky top-[96px]'>
        {wishlist.rooms.length > 0 && <MapBox rooms={wishlist.rooms} />}
      </section>
    </main>
  );
}

export default SingleWishlist;
