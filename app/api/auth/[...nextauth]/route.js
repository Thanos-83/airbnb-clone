import NextAuth, { NextAuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/database/mongoClient';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sendVerificationRequest } from '@/lib/sendVerificationRequestResend';
import connectdb from '@/database/db';
import User from '@/Models/User';
import Account from '@/Models/Account';
import Session from '@/Models/Session';
import { v4 as uuidv4 } from 'uuid';

export const authOptions = {
  providers: [
    {
      id: 'resend',
      type: 'email',
      sendVerificationRequest,
    },
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      session,
      profile,
      email,
      token,
      credentials,
      isNewUser,
    }) {
      await connectdb();
      // console.log('IAM HERE 1');
      // console.log('Session in signIn callback: ', session);
      // console.log('Token in signIn callback: ', token);
      // console.log('Is new user signIn callback: ', isNewUser);
      // console.log('Credentials signIn callback: ', credentials);

      // console.log('Account signIn callback: ', account);
      // console.log('Profile signIn callback: ', profile);
      // console.log('Email at signIn callback: ', email);
      // console.log('User at signIn callback: ', user);

      //  ===== Oauth provider ===================

      if (account.type === 'oauth') {
        const oauthUserExists = await User.findOne({ email: profile.email });
        if (!oauthUserExists) {
          const newOauthUser = {
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            emailVerified: new Date().toUTCString(),
            accountType: 'oauth',
            listings: [],
            reservations: [],
            favourites: [],
          };

          const createdOauthUser = await User.create(newOauthUser);

          const userAccount = {
            ...account,
            userId: createdOauthUser._id,
          };
          const oauthCreatedAccount = await Account.create(userAccount);

          return true;
        }
      }

      //  ======== Email provider =============
      let userEmail = email;

      if (account.type === 'email' && !userEmail) {
        const emailUserExists = await User.findOne({
          email: account.providerAccountId,
        });
        if (!emailUserExists) {
          const newEmailUser = {
            name: '',
            email: account.providerAccountId,
            image: '',
            emailVerified: new Date().toUTCString(),
            accountType: 'email',
            listings: [],
            reservations: [],
            favourites: [],
          };
          const createdEmailUser = await User.create(newEmailUser);

          const emailUserAccount = {
            ...account,
            userId: createdEmailUser._id,
          };
          const oauthCreatedAccount = await Account.create(emailUserAccount);

          return true;
        } else {
          return true;
        }
      }

      return true;
    },

    async jwt({ user, token, account, profile, isNewUser }) {
      // console.log('IAM HERE 2');
      // console.log('Token in jwt cb: ', token);
      // console.log('User in jwt cb: ', user);
      // console.log('Account in jwt cb: ', account);
      // console.log('Profile in jwt cb: ', profile);
      // console.log('Is New User in jwt cb: ', isNewUser);
      const newUser = user;
      if (newUser) {
        token.id = user.id;
        token.favourites = user.favourites;
        token.listings = user.listings;
        token.reservations = user.reservations;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log('IAM HERE 3');
      // console.log('Token in session cb: ', token);
      // console.log('Session in session cb: ', session);

      //========= when using the database strategy =============
      // session.user.id = user.id;
      // session.user.favourites = user.favourites;
      // session.user.reservations = user.reservations;

      //========= when using the jwt strategy =============

      session.user.id = token.id;
      session.user.favourites = token.favourites;
      session.user.reservations = token.reservations;

      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },

  session: {
    strategy: 'jwt',
    // strategy: 'database',
    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 1 * 24 * 60 * 60, // 10 days
    // updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  // debug: process.env.NODE_ENV === 'development',
  adapter: MongoDBAdapter(clientPromise),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
