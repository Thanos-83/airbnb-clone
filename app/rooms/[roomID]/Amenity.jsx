'use client';

function Amenity({ Icon, label }) {
  return (
    <div className='py-2 lg:py-3 flex items-center gap-4 text-[#717171]'>
      <Icon size={24} className='' />
      <p className='font-[400] text-[1rem] lg:text-[1.25rem]'>{label}</p>
    </div>
  );
}

export default Amenity;
