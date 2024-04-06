import Container from '@/components/Container';
import {
  fetchSingleRoom,
  fetchUserFavourites,
  fetchWishlists,
} from '@/lib/helpers';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { TbGridDots } from 'react-icons/tb';
import { PiDotOutlineBold } from 'react-icons/pi';

import Image from 'next/image';
import FavouriteButton from './FavouriteButton';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

async function SingleRoom({ params }) {
  const session = await getServerSession(authOptions);

  const roomInfo = await fetchSingleRoom(params.roomID);
  // console.log('Single Room Info: ', roomInfo);
  const userFavourites = await fetchUserFavourites();
  const wishlists = await fetchWishlists();
  // console.log('Single Room Wishlists: ', wishlists);
  const room = roomInfo.room;

  const favouriteInfo = {
    id: room._id.toString(),
    image: room.images.picture_url,
    name: room.name,
    price: parseFloat(room.price.toString()),
    coordinates: {
      long: room.address.location.coordinates[0],
      lat: room.address.location.coordinates[1],
    },
    beds: room.beds,
    number_of_reviews: room.number_of_reviews,
  };

  return (
    <div className='max-w-[1530px] mx-auto px-12'>
      <div className='flex items-center justify-between my-8'>
        <h1 className='text-3xl font-semibold leading-7'>{room.name}</h1>
        <div className='flex items-center gap-4'>
          <button className='rounded-xl font-semibold underline flex items-center gap-3 hover:bg-[#f7f7f7] p-3'>
            <PiUploadSimpleBold className='h-6 w-6' />
            Share
          </button>
          <FavouriteButton
            favourite={
              userFavourites
                ? userFavourites.favourites.find(
                    (favourite) => favourite.id === params.roomID
                  )
                : null
            }
            roomID={params.roomID}
            wishlists={wishlists.wishlists}
            favouriteInfo={favouriteInfo}
          />
        </div>
      </div>
      <div
        id='roomPhotos'
        className='roomImages relative rounded-xl overflow-hidden'>
        <div className='roomImages_container relative col-start-1 col-end-3 row-span-full'>
          <Image
            src={room.images.picture_url}
            // width={1000}
            // height={300}
            fill={true}
            alt={room.name}
            className='absolute inset-0 '
          />
        </div>
        <div className='roomImages_container relative col-start-3 col-end-4 row-start-1 row-end-2'>
          <Image
            src={room.images.picture_url}
            // width={1000}
            // height={300}
            fill={true}
            alt={room.name}
            className='absolute inset-0 '
          />
        </div>
        <div className='roomImages_container relative col-start-4 col-end-5 row-start-1 row-end-2'>
          <Image
            src={room.images.picture_url}
            // width={1000}
            // height={300}
            fill={true}
            alt={room.name}
            className='absolute inset-0 '
          />
        </div>
        <div className='roomImages_container relative col-start-3 col-end-4 row-start-2 row-end-3'>
          <Image
            src={room.images.picture_url}
            // width={1000}
            // height={300}
            fill={true}
            alt={room.name}
            className='absolute inset-0 '
          />
        </div>
        <div className='roomImages_container relative col-start-4 col-end-5 row-start-2 row-end-3'>
          <Image
            src={room.images.picture_url}
            // width={1000}
            // height={300}
            fill={true}
            alt={room.name}
            className='absolute inset-0 '
          />
        </div>
        <button className='rounded-lg border border-black px-6 py-2 flex items-center gap-3 text-center absolute bottom-8 right-8 bg-white text-black font-semibold'>
          <TbGridDots />
          Show all photos
        </button>
      </div>
      <div className='mt-12 mb-20 flex items-start gap-4'>
        <div className='w-[60%]'>
          <h2 className='text-xl font-semibold'>{room.room_type}</h2>
          <div className='flex items-center gap-1'>
            <p>{Number(room.accommodates)} guests</p>
            <span>
              <PiDotOutlineBold />
            </span>
            <p>{Number(room.bedrooms)} bedrooms</p>
            <span>
              <PiDotOutlineBold />
            </span>
            <p>{Number(room.beds)} beds</p>
            <span>
              <PiDotOutlineBold />
            </span>
            <p>{Number(room.bathrooms.$numberDecimal)} bathrooms</p>
          </div>
        </div>
        <div className='w-[40%]'>
          <p>Booking info</p>
        </div>
      </div>
    </div>
  );
}

export default SingleRoom;
