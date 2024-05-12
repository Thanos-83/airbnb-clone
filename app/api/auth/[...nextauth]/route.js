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
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials, req) {
        console.log('Credentials: ', credentials);
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token, account, profile, isNewUser }) {
      console.log('IAM HERE 3');
      session.user.id = user.id;
      session.user.favourites = user.favourites;
      session.user.reservations = user.reservations;
      return session;
    },
    async signIn({
      user,
      account,
      session,
      profile,
      email,
      credentials,
      isNewUser,
    }) {
      await connectdb();
      console.log('IAM HERE 1');
      console.log('Session in signIn callback: ', session);
      console.log('Is new user signIn callback: ', isNewUser);
      console.log('Credentials signIn callback: ', credentials);
      console.log('Account signIn callback: ', account);
      console.log('Profile signIn callback: ', profile);
      console.log('Email at signIn callback: ', email);

      const foundUser = await User.findOne({ email: profile.email });
      console.log('User Exists: ', foundUser);

      if (!foundUser) {
        const newUser = {
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified,
          // emailVerified: null,
          accounts: [],
          listings: [],
          reservations: [],
          favourites: [],
          sessions: [],
        };
        // console.log('New user: ', newUser);
        const createdUser = await User.create(newUser);
        console.log('Created User: ', createdUser);
        const newAccount = { ...account, userId: createdUser._id };
        console.log('New Account: ', newAccount);

        const createdAccount = await Account.create(newAccount);
        // console.log('New Account: ', createdAccount);
        // const session = { sessionToken: uuidv4(), userId: createdUser._id };
        // const newSession = await Session.create(session);
        // console.log('New Session: ', newSession);

        return true;
      } else {
        return true;
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    // strategy: 'jwt',
    strategy: 'database',
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 10 * 24 * 60 * 60, // 10 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SERCRET,
  // debug: process.env.NODE_ENV === 'development',
  adapter: MongoDBAdapter(clientPromise),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
