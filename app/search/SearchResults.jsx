'use client';

import React, { useState } from 'react';
import House from '../House';
import Link from 'next/link';
import { ResultsPagination } from './Pagination';
import { fetchSearchResults } from '../_actions/actions';
import SearchMapBox from './SearchMapBox';
import { useSearchParams } from 'next/navigation';

function SearchResults({ searchResults, wishlists, userFavourites }) {
  const searchParams = useSearchParams();
  const [results, setResults] = useState(searchResults);
  // console.log('Search Params client: ', searchParams.get('location'));
  const nextResult = async (page) => {
    const searchResults = await fetchSearchResults(
      { location: searchParams.get('location') },
      page
    );
    window.scrollTo({
      top: '190px',
      behavior: 'smooth',
    });
    setResults(searchResults);
  };
  return (
    <>
      <section className='w-full md:w-[60%] 3xl:w-1/2  pl-8 pb-12'>
        <p className='my-6 text-md font-semibold'>
          {results.length} places in {searchParams.get('location')}
        </p>
        <div className=' grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'>
          {results.length > 0 ? (
            results.map((house) => (
              <House
                key={house._id}
                //   house={JSON.parse(JSON.stringify(house))}
                house={house}
                wishlists={wishlists && wishlists.wishlists}
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
        <ResultsPagination nextResult={nextResult} />
      </section>
      <section className='hidden md:block md:w-[40%] 3xl:w-1/2 h-[calc(100vh-190px)] sticky top-[190px]'>
        {results.length > 0 && <SearchMapBox rooms={results} />}
      </section>
    </>
  );
}

export default SearchResults;
