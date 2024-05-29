import Image from 'next/image';

function Wishlist({ wishlist }) {
  // console.log('Wishlists: ', wishlist);
  return (
    <div>
      <div className='aspect-square rounded-xl border-[4px] lg:border-[10px] border-white shadow-lg overflow-hidden'>
        <Image
          className='object-cover rounded-xl h-full'
          src={`${
            wishlist.rooms.length > 0
              ? wishlist.rooms[wishlist.rooms.length - 1].image
              : '/images/logo.png'
          }`}
          width={1000}
          height={1000}
          alt={wishlist.wishlistName}
        />
      </div>
      <h2 className='mt-3 text-lg font-semibold text-black'>
        {wishlist.wishlistName}
      </h2>
      <p className='text-sm font-[400] text-[#717171]'>
        {wishlist.rooms.length} saved
      </p>
    </div>
  );
}

export default Wishlist;
