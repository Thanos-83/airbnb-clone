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
