import NextAuth, { NextAuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/database/mongoClient';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sendVerificationRequest } from '@/lib/sendVerificationRequestResend';
import connectdb from '@/database/db';
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
    async signIn({
      user,
      account,
      session,
      profile,
      email,
      credentials,
      isNewUser,
    }) {
      // connectdb();
      // console.log('IAM HERE 1');
      if (account.provider === 'resend' && !email) {
        user.name = '';
        user.image = '';
        user.accounts = [];
        user.listings = [];
        user.reservations = [];
        user.favourites = [];
        // console.log('USER_ID: ', user._id);
      } else {
        user.accounts = [];
        user.listings = [];
        user.reservations = [];
        user.favourites = [];
      }
      // console.log('User: ', user);
      // console.log('User account: ', account);
      // console.log('User session: ', session);

      // console.log('User profile: ', profile);
      // console.log('User email: ', email);
      // console.log('User credentials: ', credentials);
      // console.log('User is new User: ', isNewUser);

      return user;
    },
    async jwt({ token, user, account, profile, session, isNewUser }) {
      console.log('IAM HERE 2');

      console.log('User: ', user);
      console.log('User account: ', account);
      console.log('User profile: ', profile);
      console.log('User session: ', session);
      console.log('User is new User: ', isNewUser);
      return token;
    },
    async session({ session, user, token, account, profile, isNewUser }) {
      // console.log('IAM HERE 3');

      // console.log('Session User: ', user);
      // console.log('User session: ', session);
      // console.log('User token: ', token);
      // console.log('User account: ', account);
      // console.log('User profile: ', profile);
      // console.log('User is new User: ', isNewUser);
      session.user.id = user.id;
      session.user.favourites = user.favourites;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    // signIn: '/',
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
