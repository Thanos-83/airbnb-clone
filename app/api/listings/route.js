import { NextResponse } from 'next/server';
import Listing from '@/Models/Listing';
import connectdb from '@/database/db';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function GET(req, { params }) {
  //   console.log('Params: ', params);
  connectdb();
  try {
    const listings = await Listing.find({}).limit(20);

    // console.log('Wishlists: ', listings);
    if (!listings) {
      revalidateTag('wishlists');
      return NextResponse.json({ message: 'success', listings: [] });
    }
    // console.log('Listings: ', listings);
    // revalidatePath('/');
    revalidateTag('listings');
    revalidateTag('wishlists');
    return NextResponse.json({ message: 'success', listings });
  } catch (error) {
    return NextResponse.json({ message: 'fail', error });
  }
}
