import mongoose from 'mongoose';
import { accountSchema } from './Account';
import { reservationSchema } from './Reservation';
import { listingSchema } from './Listing';
import { sessionSchema } from './Session';
import { favouriteSchema } from './Wishlists';

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

  favorite: [favouriteSchema],
  accounts: [accountSchema],
  sessions: [sessionSchema],
  listings: [listingSchema],
  reservations: [reservationSchema],
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
