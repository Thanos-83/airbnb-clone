import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const fetchWishlists = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    const res = await fetch(
      `${process.env.SITE_URL}/api/wishlists/${session.user.id}/`,
      {
        next: {
          tags: ['wishlists', 'wishlist'],
        },
      }
    );
    const wishlists = await res.json();
    return wishlists;
  }
  return null;
};

export const fetchSingleWishlist = async (wishlistID) => {
  // console.log('Inside helper: ', wishlistID);
  const res = await fetch(
    `${process.env.SITE_URL}/api/wishlists/wishlist/${wishlistID}/`,
    {
      next: {
        tags: ['wishlist'],
      },
    }
  );
  const wishlist = await res.json();
  return wishlist;
};
