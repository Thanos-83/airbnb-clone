import Container from '@/components/Container';
import {
  fetchSingleRoom,
  fetchUserFavourites,
  fetchWishlists,
} from '@/lib/helpers';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { TbGridDots } from 'react-icons/tb';
import { PiDotOutlineBold } from 'react-icons/pi';
import { FaStar } from 'react-icons/fa6';
import { FaAngleRight } from 'react-icons/fa6';
import { FaAngleLeft } from 'react-icons/fa6';

import Link from 'next/link';
import Image from 'next/image';
import FavouriteButton from './FavouriteButton';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import ReviewsButton from './ReviewsButton';
import Amenities from './Amenities';
import LocationBox from './LocationBox';
import Ratings from './Ratings';
import Reviews from './Reviews';
import { ReviewsDialog } from './ReviewsDialog';
import { ReviewsDialogMobile } from './ReviewsDialogMobile';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import BookingWindow from './BookingWindow';
import { fetchReservations } from '@/app/_actions/actions';
import ImagesCarousel from './ImagesCarousel';

export async function generateMetadata({ params }) {
  console.log('Metada params: ', params);

  const roomInfo = await fetchSingleRoom(params.roomID);

  return {
    title: roomInfo.room.name,
  };
}

async function SingleRoom({ params }) {
  const session = await getServerSession(authOptions);

  // console.log('Server Session: ', session);

  const roomInfo = await fetchSingleRoom(params.roomID);
  // console.log('Single Room Info: ', roomInfo);

  const reservations = await fetchReservations(params.roomID);
  const userFavourites = await fetchUserFavourites();
  const wishlists = await fetchWishlists();
  // console.log('Single Room Wishlists: ', wishlists);
  const room = roomInfo.room;
  // console.log('Single Room Info: ', room);

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
    <div className='pb-16'>
      <Container small={true}>
        <div className='flex items-center justify-between my-4'>
          <h1 className='hidden md:block text-lg xl:text-2xl font-semibold leading-7'>
            {room.name}
          </h1>
          <Link
            href='/'
            className='md:hidden text-[0.875rem] font-semibold flex items-center gap-3'>
            <FaAngleLeft className='w-4 h-4' />
            <span>Homes</span>
          </Link>
          <div className='flex gap-2 items-center '>
            <button
              className='rounded-full md:rounded-xl font-semibold underline flex items-center gap-3 hover:bg-[#f7f7f7] p-3'
              aria-label='add favourite to wishlist'>
              <PiUploadSimpleBold className='h-5 w-5' />
              <span className='hidden md:inline'>Share</span>
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
              wishlists={wishlists ? wishlists.wishlists : []}
              favouriteInfo={favouriteInfo}
            />
          </div>
        </div>
      </Container>

      {/* Images carousel in tablet views and below */}

      <div className='block md:hidden'>
        <ImagesCarousel image={room.images.picture_url} />
      </div>

      {/* Images grid in tablet and above */}
      <div className='hidden md:block'>
        <Container small={true}>
          <div
            id='roomPhotos'
            className='roomImages relative rounded-xl overflow-hidden'>
            <div className='roomImages_container relative col-start-1 col-end-3 row-span-full '>
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
        </Container>
      </div>

      <div className='hidden md:block z-10 sticky top-0'>
        <nav className=' bg-white  border-b border-b-[#dddddd]'>
          <Container small={true}>
            <ul className='flex items-center gap-8'>
              <li className='font-semibold text-[1rem] leading-6 '>
                <Link href='#' className='py-4 inline-block'>
                  Photos
                </Link>
              </li>
              <li className='font-semibold text-[1rem] leading-6'>
                <Link href='#amenities' className='py-4 inline-block'>
                  Amenities
                </Link>
              </li>
              <li className='font-semibold text-[1rem] leading-6'>
                <Link href='#' className='py-4 inline-block'>
                  Reviews
                </Link>
              </li>
              <li className='font-semibold text-[1rem] leading-6'>
                <Link href='#' className='py-4 inline-block'>
                  Location
                </Link>
              </li>
            </ul>
          </Container>
        </nav>
      </div>
      <Container small={true}>
        <div className='mt-6 lg:mt-8 mb-12 flex flex-col md:flex-row items-start gap-8 md:gap-16'>
          <div className='w-full md:w-[60%]'>
            <h1 className='md:hidden mb-2 text-2xl font-semibold leading-7'>
              {room.name}
            </h1>
            <h2 className='text-[1rem] xl:text-xl font-semibold'>
              {room.room_type}
            </h2>
            <div className='flex flex-wrap items-center gap-1'>
              <p className='text-sm md:text-[1rem] font-normal'>
                {Number(room.accommodates)} guests
              </p>
              <span>
                <PiDotOutlineBold />
              </span>
              <p className='text-sm md:text-[1rem] font-normal'>
                {Number(room.bedrooms)} bedrooms
              </p>
              <span>
                <PiDotOutlineBold />
              </span>
              <p className='text-sm md:text-[1rem] font-normal'>
                {Number(room.beds)} beds
              </p>
              <span>
                <PiDotOutlineBold />
              </span>
              <p className='text-sm md:text-[1rem] font-normal'>
                {Number(room.bathrooms)} bathrooms
              </p>
            </div>
            <div className='hidden md:flex items-center gap-1 mt-2'>
              <p className='flex items-center text-[1.25rem]  font-semibold'>
                <FaStar className='w-5 h-5 mr-2' />
                {room.number_of_reviews > 0 &&
                  Number(
                    (room.review_scores.review_scores_rating / 2) * 0.1
                  ).toFixed(2)}
              </p>
              {room.number_of_reviews > 0 ? (
                <>
                  <span>
                    <PiDotOutlineBold />
                  </span>
                  <ReviewsButton numOfReviews={room.number_of_reviews} />
                </>
              ) : (
                <p className='font-semibold text-[1.25rem]'>New</p>
              )}
            </div>
            <div className='h-[1px] bg-[#DDDDDD] mt-6' />
            <div className='py-12'>
              <p>Host Info will go here...</p>
            </div>
            <div className='h-[1px] bg-[#DDDDDD]' />
            <div className='my-12'>
              <p className='font-normal text-sm md:text-[1rem] xl:text-xl'>
                {room.summary}
              </p>
              <button className='mt-6 flex items-center gap-2 underline font-semibold text-[1rem] md:text-xl'>
                Show more <FaAngleRight />
              </button>
            </div>
            <div id='amenities' className='h-[1px] bg-[#DDDDDD]' />
            <div className='my-12'>
              <h2 className='text-lg xl:text-xl font-semibold mb-4'>
                What this place offers
              </h2>
              <div>
                <Amenities />
              </div>
            </div>
          </div>
          <div className='w-full md:w-[40%] md:sticky md:top-[100px]'>
            <BookingWindow room={room} reservations={reservations} />
          </div>
        </div>
      </Container>

      {/* Separator */}
      <Container small={true}>
        <div id='reviews' className='h-[1px] bg-[#DDDDDD]' />
      </Container>

      {/* Reviews Section */}
      <div id='reviews' className='my-12'>
        {room.number_of_reviews > 0 ? (
          <Container small={true}>
            <h2 className='text-lg xl:text-xl font-semibold md:mb-6 flex items-center'>
              <FaStar className='w-5 h-5 mr-2' />
              {Number(
                (room.review_scores.review_scores_rating / 2) * 0.1
              ).toFixed(2)}
              <span>
                <PiDotOutlineBold />
              </span>
              <span>{room.number_of_reviews} reviews</span>
            </h2>
          </Container>
        ) : (
          <Container small={true}>
            <p className='font-semibold text-3xl'>No reviews (yet)</p>
          </Container>
        )}

        {room.number_of_reviews > 0 && (
          <>
            <div className='hidden md:block mb-12'>
              <Container small={true}>
                <Ratings inDialog={false} reviewScores={room.review_scores} />
              </Container>
            </div>
            <Container small={true}>
              <div className='hidden md:block h-[1px] bg-[#DDDDDD]' />
            </Container>
            <div className='my-3 md:my-8'>
              <div className='md:hidden'>
                <Reviews inDialog={false} reviews={room.reviews} />
              </div>
              <div className='hidden md:block'>
                <Container small={true}>
                  <Reviews inDialog={false} reviews={room.reviews} />
                </Container>
              </div>
              {room.number_of_reviews > 6 && (
                <Container small={true}>
                  <ReviewsDialog
                    reviewScores={room.review_scores}
                    reviews={room.reviews}
                    isMobile={true}
                  />

                  <ReviewsDialogMobile
                    reviewScores={room.review_scores}
                    reviews={room.reviews}
                    isMobile={true}
                  />
                </Container>
              )}
            </div>
          </>
        )}
      </div>

      {/* Location Section*/}
      <Container small={true}>
        <div id='location' className='h-[1px] bg-[#DDDDDD]' />
        <div className='my-12 w-full h-[40rem] aspect-video'>
          <h2 className='text-lg xl:text-xl font-semibold mb-4'>
            Where you &apos;ll be{' '}
          </h2>
          <LocationBox coordinates={room.address.location.coordinates} />
        </div>
      </Container>
    </div>
  );
}

export default SingleRoom;
