import Container from '@/components/Container';
import { fetchSearchResults } from '../_actions/actions';
import Map from './SearchMapBox';
import Link from 'next/link';
import House from '../House';
import { fetchWishlists, fetchUserFavourites } from '@/lib/helpers';
import SearchResults from './SearchResults';
import { ResultsPagination } from './Pagination';
// import { fetchWishlists } from '../_actions/actions';

export default async function SearchPage({ searchParams }) {
  const userFavourites = await fetchUserFavourites();

  const wishlists = await fetchWishlists();
  console.log('Search Params: ', searchParams);
  let page = 2;
  const searchResults = await fetchSearchResults(searchParams, page);
  // console.log('Search Results: ', searchResults);

  return (
    <main className='flex gap-8 items-start'>
      <SearchResults
        searchResults={searchResults}
        wishlists={wishlists}
        userFavourites={userFavourites}
      />
    </main>
  );
}
