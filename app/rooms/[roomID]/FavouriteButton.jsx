'use client';

import React from 'react';
import { CreateWishlistDialog } from '@/components/LikeButton/CreateWishlistDialog';
import { WishlistsDialog } from '@/components/LikeButton/WishlistsDialog';
import LikeButton from '@/components/LikeButton/LikeButton';

function FavouriteButton({ favourite, roomID, wishlists, favouriteInfo }) {
  return (
    <>
      {favourite ? (
        <LikeButton
          favourite={true}
          wishlistID={favourite.wishlist_id}
          roomID={roomID}>
          <span className='hidden md:inline-block'>Saved</span>
        </LikeButton>
      ) : wishlists && wishlists.length > 0 ? (
        <WishlistsDialog
          info={favouriteInfo}
          wishlists={JSON.parse(JSON.stringify(wishlists))}
        />
      ) : (
        <CreateWishlistDialog asButton={false} favouriteInfo={favouriteInfo} />
      )}
    </>
  );
}

export default FavouriteButton;
