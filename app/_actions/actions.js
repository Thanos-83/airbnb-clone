'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Wishlist from '@/Models/Wishlists';
import Reservation from '@/Models/Reservation';
import User from '@/Models/User';
import connectdb from '@/database/db';
import { revalidatePath, revalidateTag } from 'next/cache';
import clientPromise from '@/database/mongoClient';
import { NextResponse } from 'next/server';
import Listing from '@/Models/Listing';
import { connect } from 'mongoose';

export const fetchHouses = async (pageParams) => {
  try {
    // console.log('Fetch Houses: ', pageParams);
    const res = await fetch(
      `${process.env.SITE_URL}/api/listings/${pageParams}`,
      {
        next: {
          tags: ['wishlists', 'wishlist', 'listings'],
        },
      }
    );
    const data = await res.json();
    return data.listings;
  } catch (error) {
    return error;
  }
};

export const fetchSearchResults = async (pageParams, page = 1) => {
  try {
    console.log('Fetch Houses: ', pageParams);
    connectdb();
    const data = await Listing.find({
      'address.market': pageParams.location,
    })
      .limit(15)
      .skip((page - 1) * 15);
    // console.log('Search results: ', data[1]);
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    return error;
  }
};

export const createReservation = async (info) => {
  const session = await getServerSession(authOptions);
  const data = { ...info, user: session.user.id };
  connectdb();
  try {
    const reservation = await Reservation.create(data);
    const user = await User.findOne({ _id: session.user.id });
    user.reservations.push(reservation);
    await user.save();
    revalidatePath(`/rooms/${info.listing}`);
    return { message: 'Reservation created', reservation };
  } catch (error) {
    return { error };
  }
};

export const fetchReservations = async (listingID) => {
  connectdb();

  try {
    const reservations = await Reservation.find({ listing: listingID });

    if (!reservations) {
      return {
        message: 'Success',
        reservations: [],
      };
    }
    revalidatePath(`/rooms/${listingID}`);
    return {
      message: 'Success',
      reservations,
    };
  } catch (error) {
    return { message: 'Fail', error };
  }
};

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
    return {
      message: 'success',
      wishlists: JSON.parse(JSON.stringify(wishlists)),
    };
  } catch (error) {
    return { message: 'fail', error };
  }
};

export const handleWishlistAction = async (data) => {
  const session = await getServerSession(authOptions);
  connectdb();
  // console.log('Create wishlist inside server action: ', data);

  // we construct the info of the room we will save to wishlist
  const roomInfo = { ...data.favouriteInfo, note: '' };

  try {
    const wishlist = {
      wishlistName: data.wishlistName,
      user: session.user.id,
      rooms: [roomInfo],
    };
    const createdWishlist = await Wishlist.create(wishlist);

    const user = await User.findById({ _id: session.user.id });

    const userFavourite = {
      ...roomInfo,
      wishlist_id: createdWishlist._id.toString(),
    };
    // console.log('User favourite: ', userFavourite);
    user.favourites.push(userFavourite);

    await user.save();
    revalidateTag('wishlists');
    revalidateTag('favourites');
    revalidatePath('/wishlists');
    return {
      message: 'success',
      createdWishlsit: JSON.parse(JSON.stringify(response)),
    };
  } catch (error) {
    return { message: 'fail', error };
  }
};

export const addFavouriteToWishlist = async (data) => {
  const session = await getServerSession(authOptions);

  connectdb();
  try {
    const wishlist = await Wishlist.findOne({ _id: data.wishlistID });
    // console.log('Wishlist inside the Server Action: ', wishlist);
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
    const user = await User.findById({ _id: session.user.id });

    user.favourites.push({
      ...newRoom,
      wishlist_id: data.wishlistID.toString(),
    });

    await user.save();
    // console.log('Updated Single Wishlist in Server Action: ', wishlist);

    revalidateTag('wishlists');
    revalidateTag('favourites');
    revalidatePath('/wishlists');
    revalidatePath('/');
    return {
      message: 'success',
      updatedWishlist: JSON.parse(JSON.stringify(wishlist)),
    };
  } catch (error) {
    return { message: 'fail', err: error };
  }
};

export const removeFavourite = async (data) => {
  const session = await getServerSession(authOptions);
  // console.log('Remove favourite data: ', data);
  try {
    const wishlist = await Wishlist.findOne({ _id: data.wishlistID });

    const updatedRooms = wishlist.rooms.filter(
      (room) => room.id !== data.roomID
    );

    wishlist.rooms = updatedRooms;

    await wishlist.save();
    const user = await User.findById({ _id: session.user.id });

    const updatedUserFavourites = user.favourites.filter(
      (favourite) => favourite.id !== data.roomID
    );

    user.favourites = updatedUserFavourites;
    await user.save();
    revalidatePath('/wishlists');
    revalidatePath('/');
    revalidateTag('listings');
    revalidateTag('wishlist');
    revalidateTag('wishlists');
    revalidateTag('favourites');
    return {
      message: 'success',
    };
  } catch (error) {
    return { message: 'fail', err: error };
  }
};

export const deleteWishlist = async (wishlistID) => {
  // console.log(wishlistID);
  // const wishlistRomms = await Wishlist.find()
  const response = await Wishlist.findByIdAndDelete(wishlistID);
  // console.log('Deleted Wishlist: ', response);
  const wishlistRooms = response.rooms;
  const user = await User.findOne({ _id: response.user.toString() });
  // console.log('User: ', user);
  const userFavourites = user.favourites;

  wishlistRooms.forEach((room) => {
    let roomIndex = userFavourites.findIndex(
      (favourite) => favourite.id === room.id
    );
    console.log('Room Index: ', roomIndex);
    if (roomIndex || roomIndex === 0) {
      userFavourites.splice(roomIndex, 1);
      console.log('User Favourites: ', userFavourites);
    }
  });

  user.favourites = userFavourites;
  await user.save();
  revalidateTag('wishlists');
  revalidateTag('listings');
  revalidatePath('/');
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
  // console.log('Update Wishlist Room Data: ', data);
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
