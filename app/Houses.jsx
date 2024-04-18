'use client';

import React from 'react';
import House from './House';

function Houses({ listings, wishlists, userFavourites }) {
  return (
    <div>
      <div className='grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {listings?.map((house) => (
          <House
            key={house._id}
            //   house={JSON.parse(JSON.stringify(house))}
            house={house}
            wishlists={wishlists && wishlists}
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
      <div>
        <p>Loagind spinner....</p>
      </div>
    </div>
  );
}

export default Houses;
