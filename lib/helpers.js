import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import Listing from '@/Models/Listing';
import connectdb from '@/database/db';

const categories = [
  {
    label: 'Countryside',
  },
  {
    label: 'Amazing pools',
  },
  {
    label: 'Off-the-grid',
  },
  {
    label: 'Islands',
  },
  {
    label: 'Camping',
  },
  {
    label: 'Mansions',
  },
  {
    label: 'Domes',
  },
  {
    label: 'Windmills',
  },
  {
    label: 'Beachfront',
  },
  {
    label: 'Castles',
  },
  {
    label: 'Historical homes',
  },
  {
    label: 'National parks',
  },
  {
    label: 'Vineyards',
  },
  {
    label: 'Lake',
  },
  {
    label: 'Amazing views',
  },
  {
    label: 'OMG!',
  },
  {
    label: 'Cabins',
  },
  {
    label: 'Tropical',
  },
  {
    label: 'Top of the world',
  },
  {
    label: 'Treehouses',
  },
];

export const fetchWishlists = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    const res = await fetch(
      `${process.env.SITE_URL}/api/wishlists/${session.user.id}/`,
      {
        next: {
          tags: ['wishlists', 'wishlist'],
        },
      }
    );
    const wishlists = await res.json();
    return wishlists;
  }
  return null;
};

export const fetchUserFavourites = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    const res = await fetch(
      `${process.env.SITE_URL}/api/favourites/${session.user.id}/`,
      {
        next: {
          tags: ['favourites'],
        },
      }
    );
    const userFavourites = await res.json();

    // console.log('User favourites in helper function: ', userFavourites);
    return userFavourites;
  }
  return null;
};

export const fetchSingleWishlist = async (wishlistID) => {
  // console.log('Inside helper: ', wishlistID);
  const res = await fetch(
    `${process.env.SITE_URL}/api/wishlists/wishlist/${wishlistID}/`,
    {
      next: {
        tags: ['wishlist'],
      },
    }
  );
  const wishlist = await res.json();
  return wishlist;
};

export const fetchSingleRoom = async (roomID) => {
  // console.log('Inside helper: ', roomID);
  const res = await fetch(`${process.env.SITE_URL}/api/room/${roomID}/`);
  const room = await res.json();
  return room;
};

export const constructListings = async (rooms) => {
  console.log('DATA: ', rooms[2]);

  connectdb();
  const listings = rooms.map((room) => {
    const randomCategoryNumber = Math.floor(Math.random() * categories.length);

    return {
      name: room.name,
      summary: room.summary,
      space: room.space,
      description: room.description,
      property_type: room.property_type,
      room_type: room.room_type,
      cancellation_policy: room.cancellation_policy,
      minimum_nights: room.minimum_nights,
      maximum_nights: room.maximum_nights,
      accommodates: room.accommodates,
      bedrooms: room.bedrooms,
      beds: room.beds,
      bathrooms: room.bathrooms
        ? Number(room.bathrooms.$numberDecimal)
        : undefined,
      number_of_reviews: room.number_of_reviews,
      amenities: room.amenities,
      price: Number(room.price.$numberDecimal),
      security_deposit: room.security_deposit
        ? Number(room.security_deposit.$numberDecimal)
        : undefined,
      cleaning_fee: room.cleaning_fee
        ? Number(room.cleaning_fee.$numberDecimal)
        : undefined,
      images: {
        picture_url: room.images.picture_url,
      },
      address: {
        street: room.address.street,
        suburb: room.address.suburb,
        goverment_area: room.address.government_area,
        market: room.address.market,
        country: room.address.country,
        country_code: room.address.country_code,
        location: {
          type: room.address.location.type,
          is_location_exact: room.address.location.is_location_exact,
          coordinates: room.address.location.coordinates,
        },
        review_scores: {
          review_scores_accuracy: room.review_scores.review_scores_accuracy,
          review_scores_cleanliness:
            room.review_scores.review_scores_cleanliness,
          review_scores_checkin: room.review_scores.review_scores_checkin,
          review_scores_communication:
            room.review_scores.review_scores_communication,
          review_scores_location: room.review_scores.location,
          review_scores_value: room.review_scores.value,
          review_scores_rating: room.review_scores.rating,
        },
      },
      review_scores: {
        review_scores_accuracy: room.review_scores.review_scores_accuracy,
        review_scores_cleanliness: room.review_scores.review_scores_cleanliness,
        review_scores_checkin: room.review_scores.review_scores_checkin,
        review_scores_communication:
          room.review_scores.review_scores_communication,
        review_scores_location: room.review_scores.review_scores_location,
        review_scores_value: room.review_scores.review_scores_value,
        review_scores_rating: room.review_scores.review_scores_rating,
      },
      reviews: room.reviews,
      category: categories[randomCategoryNumber].label,
    };
  });

  // console.log(listings.slice(1, 10));
  await Listing.insertMany(listings);
};
