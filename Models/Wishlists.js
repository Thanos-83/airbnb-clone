import mongoose from 'mongoose';

export const favouriteSchema = new mongoose.Schema({
  id: { type: String },
  image: { type: String },
  name: { type: String },
  price: { type: Number },
  note: { type: String },
  coordinates: {
    lat: {
      type: String,
    },
    long: {
      type: String,
    },
  },
  beds: {
    type: Number,
  },
  number_of_reviews: {
    type: Number,
  },
});

export const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  wishlistName: {
    type: String,
  },
  rooms: [favouriteSchema],
});

const Wishlist =
  mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
