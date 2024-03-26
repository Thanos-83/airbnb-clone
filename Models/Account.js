import mongoose from 'mongoose';

export const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      //   required: true,
      ref: 'User',
    },
    type: {
      type: String,
      //   required: true,
    },
    provider: {
      type: String,
      // unique: true,
    },
    providerAccountId: {
      type: String,
      // unique: true,
    },
    refresh_token: {
      type: String,
    },
    access_token: {
      type: String,
    },
    expires_at: {
      type: Number,
    },
    token_type: {
      type: String,
    },
    scope: {
      type: String,
    },
    id_token: {
      type: String,
    },
    session_state: {
      type: String,
    },
    oauth_token_secret: {
      type: String,
    },
    oauth_token: {
      type: String,
    },

    // expires: timestamps,
  },
  {
    timestamps: true,
  }
);

const Account =
  mongoose.models.Account || mongoose.model('Account', accountSchema);

export default Account;
