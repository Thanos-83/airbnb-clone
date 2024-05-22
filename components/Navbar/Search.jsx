'use client';
import { BiSearch } from 'react-icons/bi';
import { DatePicker } from './DatePicker';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { useNavigation } from 'react-day-picker';

function Search() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const searchResults = () => {
    router.push(`/search?location=${location}`, { shallow: false });
    // window.location.reload();

    // router.reload();
    setLocation('');
  };

  return (
    <div className=' border-[1px] sm:mx-4 md:mx-12 max-w-[60rem] md:w-auto h-16 rounded-full shadow-sm hover:shadow-md transition overflow-hidden'>
      <div className='flex flex-row items-center justify-between px-4 h-full'>
        <div className='h-full flex-1'>
          <label htmlFor='location' className='src-only'>
            <input
              name='location'
              id='location'
              className='font-semibold w-full outline-none h-full px-6'
              placeholder='Search destinations'
              type='text'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
        </div>

        <div className='hidden w-1/4 text-lg font-semibold px-6 border-x-[1px]  text-center'>
          <DatePicker />
        </div>
        <div className='hidden w-1/4 text-sm pl-6 pr-2 text-gray-600   flex-row items-center justify-between gap-3'>
          <div className='hidden sm:block text-sm font-semibold'> Guest</div>
        </div>
        <button
          onClick={() => searchResults()}
          className='p-2 bg-rose-500 rounded-full text-white'>
          <BiSearch size={16} className='font-bold' />
        </button>
      </div>
    </div>
  );
}

export default Search;
