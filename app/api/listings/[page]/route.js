import { NextResponse } from 'next/server';
import Listing from '@/Models/Listing';
import connectdb from '@/database/db';
import { revalidatePath, revalidateTag } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  console.log('Params in fetching listings: ', params);
  connectdb();
  try {
    const listingsCount = await Listing.countDocuments();
    console.log('Number of listings: ', listingsCount);
    const listings = await Listing.find({})
      .limit(12)
      .skip((Number(params.page) - 1) * 12);

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
