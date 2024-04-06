import { NextResponse } from 'next/server';
import Wishlist from '@/Models/Wishlists';
import User from '@/Models/User';
import connectdb from '@/database/db';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function GET(req, { params }) {
  connectdb();
  try {
    const user = await User.findOne({ _id: params.userID });
    // console.log('GET User Favourites: ', user);
    if (!user) {
      revalidateTag('favourites');
      return NextResponse.json({ message: 'fail', user: undefined });
    }
    revalidateTag('favourites');
    return NextResponse.json({
      message: 'success',
      favourites: user.favourites,
    });
  } catch (error) {
    return NextResponse.json({ message: 'fail', error });
  }
}
