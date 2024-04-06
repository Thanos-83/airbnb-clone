import mongoose from 'mongoose';
import { accountSchema } from './Account';
import { reservationSchema } from './Reservation';
import { listingSchema } from './Listing';
import { sessionSchema } from './Session';

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

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  emailVerified: {
    type: Date,
  },
  image: {
    type: String,
  },

  favourites: [userFavouriteSchema],
  accounts: [accountSchema],
  sessions: [sessionSchema],
  listings: [listingSchema],
  reservations: [reservationSchema],
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
