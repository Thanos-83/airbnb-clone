import Container from '@/components/Container';
import clientPromise from '@/database/mongoClient';
import House from './House';
import {
  constructListings,
  fetchWishlists,
  fetchUserFavourites,
} from '@/lib/helpers';
import { revalidateTag } from 'next/cache';
import { promises as fs } from 'fs';
import { fetchHouses } from './_actions/actions';
import Houses from './Houses';

// const fetchHouses = async () => {
//   try {
//     const res = await fetch(`${process.env.SITE_URL}/api/listings`, {
//       next: {
//         tags: ['wishlists', 'wishlist', 'listings'],
//         // revalidate: 1,
//       },
//     });
//     const data = await res.json();
//     return data.listings;
//   } catch (error) {
//     return error;
//   }
// };

export default async function Home() {
  const houses = await fetchHouses();
  const userFavourites = await fetchUserFavourites();

  const wishlists = await fetchWishlists();

  // const data = await fs.readFile(process.cwd() + '/sample_airbnb.json', 'utf8');
  // const listings = await JSON.parse(data);
  // constructListings(listings);

  return (
    <main className=''>
      <Container>
        <div className='my-12'>
          <Houses
            listings={houses}
            wishlists={wishlists && wishlists.wishlists}
            userFavourites={userFavourites}
          />
          {/* {houses?.map((house) => (
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
          ))} */}
        </div>
      </Container>
    </main>
  );
}
