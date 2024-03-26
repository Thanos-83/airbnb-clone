import mongoose from 'mongoose';
import { reservationsSchema } from './Reservation';
export const listingSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  imageSrc: {
    type: String,
  },
  category: {
    type: String,
  },
  roomCount: {
    type: Number,
  },
  bathroomCount: {
    type: Number,
  },
  guestCount: {
    type: Number,
  },
  locationValue: {
    type: String,
  },
  price: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  reservations: [reservationsSchema],
});

const Listing =
  mongoose.models.Listing || mongoose.model('Listing', listingSchema);

export default Listing;
