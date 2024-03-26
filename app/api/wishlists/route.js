import { NextResponse } from 'next/server';
import Favourite from '@/Models/Wishlists';
import connectdb from '@/database/db';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(req) {
  connectdb();
  const data = await req.json();
  console.log('Body API: ', data);
  try {
    const wishlist = {
      user: data.user,
      wishlistName: data.wishlistName,
      rooms: [
        {
          id: data.id,
          image: data.image,
          name: data.name,
          price: data.price,
          note: '',
          coordinates: {
            lat: data.coordinates.lat,
            long: data.coordinates.long,
          },
          beds: data.beds,
          number_of_reviews: data.number_of_reviews,
        },
      ],
    };
    console.log('Wishlist API: ', wishlist);
    const response = await Favourite.create(wishlist);
    // revalidatePath('/');
    revalidateTag('wishlists');
    return NextResponse.json({ message: 'success', response });
  } catch (error) {
    return NextResponse.json({ message: 'fail', error });
  }
}

export async function PUT(req) {
  connectdb();
  const body = await req.body;
  console.log('Update body API: ', body);
}
