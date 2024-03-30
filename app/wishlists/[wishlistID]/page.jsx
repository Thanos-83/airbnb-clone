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

async function SingleWishlist({ params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/auth/signin');
  }

  const { wishlist } = await fetchSingleWishlist(params.wishlistID);
  return (
    <main className='flex gap-8 items-start'>
      <section className='w-full md:w-[60%] 3xl:w-1/2  pl-8 pb-12'>
        <TopBar wishlistInfo={wishlist} />
        <h1 className='mb-8 text-3xl font-semibold text-[#222222]'>
          {wishlist.wishlistName}
        </h1>
        <BookingActions />
        <div className='my-12 grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-8'>
          {wishlist.rooms.map((room) => (
            <WishlistItem
              key={room._id}
              house={room}
              wishlist={wishlist}
              roomID={room._id}
            />
          ))}
        </div>
      </section>
      <section className='hidden md:block md:w-[40%] 3xl:w-1/2 h-[calc(100vh-96px)] sticky top-[96px]'>
        <MapBox rooms={wishlist.rooms} />
      </section>
    </main>
  );
}

export default SingleWishlist;
