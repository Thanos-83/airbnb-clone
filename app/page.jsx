import Container from '@/components/Container';
import clientPromise from '@/database/mongoClient';
import House from './House';
import { constructListings, fetchWishlists } from '@/lib/helpers';
import { revalidateTag } from 'next/cache';
import { promises as fs } from 'fs';

import { fetchUserFavourites } from '@/lib/helpers';

const fetchHouses = async () => {
  try {
    const res = await fetch(`${process.env.SITE_URL}/api/listings`, {
      next: {
        tags: ['wishlists', 'wishlist', 'listings'],
        // revalidate: 1,
      },
    });
    const data = await res.json();
    return data.listings;
  } catch (error) {
    return error;
  }
};

export default async function Home() {
  const houses = await fetchHouses();
  const userFavourites = await fetchUserFavourites();

  // console.log('Houses in Homepage: ', houses.slice(1, 3));
  // console.log('User favourites in Homepage: ', userFavourites);

  const wishlists = await fetchWishlists();

  // console.log('Wishlists in Homepage: ', typeof wishlists);

  // const data = await fs.readFile(process.cwd() + '/sample_airbnb.json', 'utf8');
  // const listings = await JSON.parse(data);
  // constructListings(listings);

  return (
    <main className=''>
      <Container>
        <div className='my-12 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {houses?.map((house) => (
            <House
              key={house._id}
              house={JSON.parse(JSON.stringify(house))}
              // house={house}
              wishlists={
                wishlists && JSON.parse(JSON.stringify(wishlists.wishlists))
              }
              favourite={
                userFavourites
                  ? userFavourites.favourites.find(
                      (favourite) => favourite.id === house._id.toString()
                    )
                  : false
              }
              isFavourite={
                userFavourites
                  ? userFavourites.favourites.some(
                      (favourite) => favourite.id === house._id.toString()
                    )
                  : false
              }
            />
          ))}
        </div>
      </Container>
    </main>
  );
}
