import { NextResponse } from 'next/server';
import Favourite from '@/Models/Wishlists';
import connectdb from '@/database/db';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function PUT(req) {
  connectdb();
  const body = await req.body;
  console.log('Update body API: ', body);
}
