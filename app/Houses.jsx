'use client';

import React, { useState, useEffect } from 'react';
import House from './House';
import { useInView } from 'react-intersection-observer';
import { fetchHouses } from './_actions/actions';
function Houses({ houses, wishlists, userFavourites }) {
  const [listings, setListings] = useState(houses);
  const [page, setPage] = useState(2);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const loadMoreListings = async () => {
    if (page > 30) return;
    const data = await fetchHouses(page);
    console.log('DATA: ', data);
    setListings((prev) => [...prev, ...data]);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (inView) {
      loadMoreListings();
    }
  }, [inView]);

  // console.log('In View: ', inView);
  // console.log('Entry: ', entry);
  return (
    <>
      <div className='grid gap-4 md:gap-6 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
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
      {page < 30 && (
        <div className='mt-12 flex justify-center' ref={ref}>
          <div className='lds-spinner'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Houses;
