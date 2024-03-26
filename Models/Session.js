import mongoose from 'mongoose';

export const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    sessionToken: {
      type: String,
      //   required: true,
      unique: true,
    },
    expires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Session =
  mongoose.models.Session || mongoose.model('Session', sessionSchema);

export default Session;
