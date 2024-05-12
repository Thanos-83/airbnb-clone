'use client';

import React from 'react';
import { FaRegHeart } from 'react-icons/fa6';
import { CreateWishlistDialog } from '@/components/LikeButton/CreateWishlistDialog';
import { WishlistsDialog } from '@/components/LikeButton/WishlistsDialog';
import LikeButton from '@/components/LikeButton/LikeButton';

function FavouriteButton({ favourite, roomID, wishlists, favouriteInfo }) {
  console.log('Favourite button at favourite: ', favourite);

  return (
    <div>
      {favourite ? (
        <LikeButton
          favourite={true}
          wishlistID={favourite.wishlist_id}
          roomID={roomID}>
          Saved
        </LikeButton>
      ) : wishlists && wishlists.length > 0 ? (
        <WishlistsDialog
          info={favouriteInfo}
          wishlists={JSON.parse(JSON.stringify(wishlists))}
        />
      ) : (
        <CreateWishlistDialog asButton={false} favouriteInfo={favouriteInfo} />
      )}
    </div>
  );
}

export default FavouriteButton;
