import Container from '@/components/Container';
import clientPromise from '@/database/mongoClient';
import House from './House';
import { fetchWishlists } from '@/lib/helpers';
import { revalidateTag } from 'next/cache';

const fetchHouses = async () => {
  const client = await clientPromise;
  const db = client.db('sample_airbnb');
  const data = await db
    .collection('listingsAndReviews')
    .find({})
    .limit(50)
    .toArray();
  revalidateTag('wishlists');
  return data;
};

export default async function Home() {
  const houses = await fetchHouses();

  const wishlists = await fetchWishlists();

  return (
    <main className=''>
      <Container>
        <div className='mt-12 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {houses?.map((house) => (
            <House
              key={house._id}
              // house={JSON.parse(JSON.stringify(house))}
              house={house}
              wishlists={wishlists && wishlists.wishlists}
            />
          ))}
        </div>
      </Container>
    </main>
  );
}
