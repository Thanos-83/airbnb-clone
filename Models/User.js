import mongoose from 'mongoose';
import { reservationSchema } from './Reservation';
import { listingSchema } from './Listing';

const userFavouriteSchema = new mongoose.Schema({
  id: { type: String },
  image: { type: String },
  name: { type: String },
  price: { type: Number },
  note: { type: String },
  wishlist_id: {
    type: String,
  },
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

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      sparse: true,
    },

    emailVerified: {
      // type: Boolean,
      type: Date,
    },
    image: {
      type: String,
    },
    accountType: {
      type: String,
    },
    favourites: [userFavouriteSchema],
    listings: [listingSchema],
    reservations: [reservationSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
