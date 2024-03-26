import { NextResponse } from 'next/server';
import Wishlist from '@/Models/Wishlists';
import connectdb from '@/database/db';
import { revalidateTag } from 'next/cache';

export async function GET(req, { params }) {
  // console.log('Params single wishlist: ', params);
  connectdb();
  try {
    const wishlist = await Wishlist.findOne({ _id: params.wishlistID });
    // console.log('Single Wishlist: ', wishlist);
    if (!wishlist) {
      revalidateTag('wishlist');
      return NextResponse.json({ message: 'success', wishlist: [] });
    }
    revalidateTag('wishlist');
    return NextResponse.json({ message: 'success', wishlist });
  } catch (error) {
    return NextResponse.json({ message: 'fail', error });
  }
}

export async function PUT(req, { params }) {
  connectdb();
  console.log('Iam here in the route: ', params);
  const data = await req.json();
  console.log('DATA inside the API: ', data);
  console.log('Params inside the API: ', params);
  try {
    let wishlist = await Wishlist.findOne({ _id: params.wishlistID });
    console.log('Wishlist inside API: ', wishlist);
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

    wishlist.save();
    console.log('Updated Single Wishlist: ', wishlist);

    revalidateTag('wishlist');
    return NextResponse.json({ message: 'success', wishlist });
  } catch (error) {
    return NextResponse.json({ message: 'fail', error });
  }
}
