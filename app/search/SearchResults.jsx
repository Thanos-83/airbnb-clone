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
  // console.log('Search Results client: ', results);

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
          {results?.numberOfListings} places in {searchParams.get('location')}
        </p>
        <div className=' grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'>
          {results.data.length > 0 ? (
            results?.data.map((house) => (
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
              <h2 className='text-2xl font-medium'>No results!</h2>
              <p className='my-8'>
                It seems that your currents search do not match to any
                location... Try a different one!!
              </p>
              <Link
                href='/'
                className='rounded-xl text-xl text-white font-medium bg-black py-6 px-8 '>
                Or start expoloring
              </Link>
            </div>
          )}
        </div>
        <ResultsPagination
          nextResult={nextResult}
          pages={results.pagesNumber}
        />
      </section>
      <section className='hidden md:block md:w-[40%] 3xl:w-1/2 h-[calc(100vh-190px)] sticky top-[190px]'>
        {results?.data.length > 0 && <SearchMapBox rooms={results?.data} />}
      </section>
    </>
  );
}

export default SearchResults;
