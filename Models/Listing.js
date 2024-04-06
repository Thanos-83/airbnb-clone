import mongoose from 'mongoose';
import { reservationSchema } from './Reservation';

export const amenitiesSchema = new mongoose.Schema({
  tv: { type: String, default: '' },
  cable_tv: { type: String, default: '' },
  wifi: { type: String, default: '' },
  smoking_allowed: { type: String, default: '' },
  pets_allowed: { type: String, default: '' },
  washer: { type: String, default: '' },
  iron: { type: String, default: '' },
  coffee_maker: { type: String, default: '' },
  oven: { type: String, default: '' },
  refrigerator: { type: String, default: '' },
});

export const listingSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  summary: {
    type: String,
  },
  space: {
    type: String,
  },
  description: {
    type: String,
  },
  property_type: {
    type: String,
  },
  room_type: {
    type: String,
  },
  cancellation_policy: {
    type: String,
  },
  minimum_nights: {
    type: Number,
  },
  maximum_nights: {
    type: Number,
  },
  accommodates: {
    type: Number,
  },
  bedrooms: {
    type: Number,
  },
  beds: {
    type: Number,
  },
  bathrooms: {
    type: Number,
  },
  number_of_reviews: {
    type: Number,
  },
  amenities: [],
  price: {
    type: Number,
  },
  security_deposit: {
    type: Number,
  },
  cleaning_fee: {
    type: Number,
  },
  images: {
    picture_url: {
      type: String,
    },
  },
  address: {
    street: { type: String, default: '' },
    suburb: { type: String, default: '' },
    government_area: { type: String, default: '' },
    market: { type: String, default: '' },
    country: { type: String, default: '' },
    country_code: { type: String, default: '' },
    location: {
      type: { type: String, default: '' },
      is_location_exact: Boolean,
      coordinates: [],
    },
  },
  review_scores: {
    review_scores_accuracy: Number,
    review_scores_cleanliness: Number,
    review_scores_checkin: Number,
    review_scores_communication: Number,
    review_scores_location: Number,
    review_scores_value: Number,
    review_scores_rating: Number,
  },
  reviews: [],
  category: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  reservations: [reservationSchema],
});

const Listing =
  mongoose.models.Listing || mongoose.model('Listing', listingSchema);

export default Listing;
