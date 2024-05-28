'use client';
import { categories } from '@/components/Categories/Categories';
import Amenity from './Amenity';
// import

function Amenities() {
  return (
    <div className='space-y-2'>
      <div className='hidden lg:grid  grid-cols-2 justify-start'>
        {categories.slice(1, 11).map((category, index) => (
          <Amenity key={index} Icon={category.icon} label={category.label} />
        ))}
      </div>
      <div className=' grid lg:hidden grid-cols-1 justify-start'>
        {categories.slice(1, 6).map((category, index) => (
          <Amenity key={index} Icon={category.icon} label={category.label} />
        ))}
      </div>
      <button className='w-full sm:w-[300px] text-black text-xl py-4 px-6 border rounded-lg border-[#222222] bg-white hover:bg-[#F7F7F7] hover:border-black'>
        Show all 22 amenities
      </button>
    </div>
  );
}

export default Amenities;
