import clientPromise from '@/database/mongoClient';
import { NextResponse } from 'next/server';
import connectdb from '@/database/db';
import Listing from '@/Models/Listing';

export async function GET(req, { params }) {
  try {
    connectdb();

    const room = await Listing.findById({ _id: params.roomID });
    // console.log('Single Room: ', room);

    return NextResponse.json({ message: 'success', room });
  } catch (error) {
    return NextResponse.json({ message: 'fail', error });
  }
}
