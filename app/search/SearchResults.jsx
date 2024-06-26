'use client';

import React, { useEffect, useState } from 'react';
import House from '../House';
import Link from 'next/link';
import { ResultsPagination } from './Pagination';
import { fetchSearchResults } from '../_actions/actions';
import SearchMapBox from './SearchMapBox';
import { useSearchParams } from 'next/navigation';

function SearchResults({ searchResults, wishlists, userFavourites }) {
  const searchParams = useSearchParams();
  const [results, setResults] = useState(searchResults);
  const [location, setLocation] = useState(searchParams.get('location'));
  const [page, setPage] = useState(null);
  // console.log('Iam in search results component....');
  // console.log('Search Results client: ', results);

  // console.log('Search Params client: ', searchParams.get('location'));
  const nextResult = async (page) => {
    setPage(page);
  };

  useEffect(() => {
    const fetchResults = async () => {
      const searchResults = await fetchSearchResults(
        { location: searchParams.get('location') },
        // location,
        page
      );
      window.scrollTo({
        top: '190px',
        behavior: 'smooth',
      });
      setResults(searchResults);
    };

    fetchResults();
  }, [page]);

  useEffect(() => {
    const fetchResultsByLocation = async () => {
      const searchResults = await fetchSearchResults(
        { location: searchParams.get('location') },
        0
      );
      window.scrollTo({
        top: '190px',
        behavior: 'smooth',
      });
      setResults(searchResults);
    };

    fetchResultsByLocation();
  }, [searchParams]);

  return (
    <>
      <section className='w-full lg:w-[60%] xl:w-[50%] 2xl:w-[60%] 4xl:w-[40%] px-4 lg:px-0 lg:pl-8 pb-12'>
        <p className='my-6 text-md font-semibold'>
          {results?.numberOfListings} places in {searchParams.get('location')}
        </p>
        <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3 gap-8'>
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
      <section className='hidden lg:block lg:w-[40%] xl:w-[50%] 2xl:w-[40%] 4xl:w-[60%] h-[calc(100vh-190px)] sticky top-[190px]'>
        {results?.data.length > 0 && <SearchMapBox rooms={results?.data} />}
      </section>
    </>
  );
}

export default SearchResults;
