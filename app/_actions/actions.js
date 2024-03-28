'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Wishlist from '@/Models/Wishlists';
import Favourite from '@/Models/Wishlists';
import connectdb from '@/database/db';
import { revalidateTag } from 'next/cache';
import clientPromise from '@/database/mongoClient';
import { NextResponse } from 'next/server';

export const fetchWishlists = async () => {
  const session = await getServerSession(authOptions);

  connectdb();
  try {
    const wishlists = await Wishlist.find({ user: session.user.id });
    // console.log('Wishlists: ', wishlists);
    if (!wishlists) {
      revalidateTag('wishlists');
      return { message: 'success', wishlists: [] };
    }
    // revalidatePath('/');
    revalidateTag('wishlists');
    return { message: 'success', wishlists };
  } catch (error) {
    return { message: 'fail', error };
  }
};

export const handleWishlistAction = async (data) => {
  const session = await getServerSession(authOptions);

  // we fetch the data of the specific room
  const client = await clientPromise;
  const db = client.db('sample_airbnb');
  const house = await db
    .collection('listingsAndReviews')
    .find({ _id: data.roomID })
    .toArray();

  // we construct the info of the room we will save to wishlist
  const roomInfo = {
    id: house[0]._id,
    image: house[0].images.picture_url,
    name: house[0].name,
    price: parseFloat(house[0].price.toString()),
    coordinates: {
      long: house[0].address.location.coordinates[0],
      lat: house[0].address.location.coordinates[1],
    },
    note: '',
    beds: house[0].beds,
    number_of_reviews: house[0].number_of_reviews,
  };

  try {
    const wishlist = {
      wishlistName: data.name,
      user: session.user.id,
      rooms: [roomInfo],
    };
    // console.log('Wishlist Server Action: ', wishlist);
    const response = await Favourite.create(wishlist);
    revalidateTag('wishlists');
    return { message: 'success', createdWishlsit: JSON.stringify(response) };
  } catch (error) {
    return { message: 'fail', error };
  }
};

export const addFavouriteToWishlist = async (data) => {
  connectdb();
  try {
    const wishlist = await Wishlist.findOne({ _id: data.wishlistID });
    console.log('Wishlist inside the Server Action: ', wishlist);
    const newRoom = {
      id: data.favouriteInfo.id,
      image: data.favouriteInfo.image,
      name: data.favouriteInfo.name,
      price: data.favouriteInfo.price,
      note: '',
      coordinates: {
        lat: data.favouriteInfo.coordinates.lat,
        long: data.favouriteInfo.coordinates.long,
      },
      beds: data.favouriteInfo.beds,
      number_of_reviews: data.favouriteInfo.number_of_reviews,
    };
    wishlist.rooms.push(newRoom);

    await wishlist.save();
    console.log('Updated Single Wishlist in Server Action: ', wishlist);

    revalidateTag('wishlist');
    return { message: 'success', updatedWishlist: JSON.stringify(wishlist) };
  } catch (error) {
    return { message: 'fail', err: error };
  }
};

export const deleteWishlist = async (wishlistID) => {
  console.log(wishlistID);
  const response = await Wishlist.findByIdAndDelete(wishlistID);
  console.log('Deleted Wishlist: ', response);
  revalidateTag('wishlists');
};

export const updateWishlistName = async (data) => {
  const session = await getServerSession(authOptions);
  const wishlist = await Wishlist.findOne({ user: session.user.id })
    .where('_id')
    .equals(data.wishlistID);

  if (wishlist) {
    wishlist.wishlistName = data.name;

    const newWishlist = await wishlist.save();
    revalidateTag('wishlist');
  }
};

export const updateRoomNote = async (data) => {
  console.log('Update Wishlist Room Data: ', data);
  try {
    const wishlist = await Wishlist.findOne({
      _id: data.wishlistID,
    });

    const roomIndex = wishlist.rooms.findIndex(
      (room) => room._id.toString() === data.roomID
    );

    wishlist.rooms[roomIndex].note = data.note;
    const newWishlist = await wishlist.save();
    const updatedRoomNote = newWishlist.rooms[roomIndex].note;
    revalidateTag('wishlist');
    return { message: 'success', roomNote: updatedRoomNote };
  } catch (error) {
    return { message: 'fail', error };
  }
};
