import Container from '@/components/Container';
import React from 'react';
import { fetchWishlists } from '@/lib/helpers';
import Wishlist from '@/components/wishlist/Wishlist';
import Link from 'next/link';
import DeleteButton from './DeleteButton';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function Wishlists() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/auth/signin');
  }
  const { wishlists } = await fetchWishlists();
  return (
    <main className='my-12'>
      {wishlists.length > 0 ? (
        <Container>
          <h1 className='text-[#222222] font-semibold text-3xl mb-10'>
            Wishlists
          </h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {wishlists.map((wishlist) => (
              <div className='relative group' key={wishlist._id}>
                <Link href={`/wishlists/${wishlist._id}`}>
                  <Wishlist wishlist={wishlist} />
                </Link>
                <DeleteButton id={wishlist._id} />
              </div>
            ))}
          </div>
        </Container>
      ) : (
        <Container>
          <h1 className='text-3xl font-[600] text-[#222222]'>Wishlists</h1>
          <h2 className='text-[1.375rem] text-[#222222] font-[600] mt-12'>
            Create your first wishlist
          </h2>
          <p className='max-w-[500px] mt-4 text-[#717171]'>
            As you search, click the heart icon to save your favourite places
            and Experiences to a wishlist.
          </p>
        </Container>
      )}
    </main>
  );
}

export default Wishlists;
