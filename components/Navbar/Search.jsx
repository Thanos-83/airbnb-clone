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
    router.push(`/search?location=${location}`);
  };

  return (
    <div className='border-[1px] flex-1 mx-12 max-w-[60rem] md:w-auto h-16 rounded-full shadow-sm hover:shadow-md transition overflow-hidden'>
      <div className='flex flex-row items-center justify-between px-4 h-full'>
        <div className='h-full w-1/2'>
          {/* <label>Where</label> */}
          <input
            className='font-semibold w-full outline-none h-full px-6'
            placeholder='Search destinations'
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className='hidden w-1/4 sm:block text-lg font-semibold px-6 border-x-[1px]  text-center'>
          <DatePicker />
        </div>
        <div className='w-1/4 text-sm pl-6 pr-2 text-gray-600 flex  flex-row items-center justify-between gap-3'>
          <div className='hidden sm:block'> Guest</div>
          <button
            onClick={() => searchResults()}
            className='p-2 bg-rose-500 rounded-full text-white'>
            <BiSearch size={16} className='font-bold' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
