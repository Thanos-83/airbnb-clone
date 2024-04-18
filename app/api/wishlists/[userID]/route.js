import { NextResponse } from 'next/server';
import Wishlist from '@/Models/Wishlists';
import connectdb from '@/database/db';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function GET(req, { params }) {
  //   console.log('Params: ', params);
  connectdb();
  try {
    const wishlists = await Wishlist.find({ user: params.userID });
    // console.log('Wishlists: ', wishlists);
    if (!wishlists) {
      revalidateTag('wishlists');
      return NextResponse.json({ message: 'success', wishlists: [] });
    }
    revalidatePath('/wishlists');
    revalidateTag('wishlists');
    return NextResponse.json({ message: 'success', wishlists });
  } catch (error) {
    return NextResponse.json({ message: 'fail', error });
  }
}
