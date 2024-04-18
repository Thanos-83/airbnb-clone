'use client';

function Amenity({ Icon, label }) {
  return (
    <div className='py-3 flex items-center gap-4 text-[#717171]'>
      <Icon size={34} className='' />
      <p className='font-[400] text-[1.25rem]'>{label}</p>
    </div>
  );
}

export default Amenity;
