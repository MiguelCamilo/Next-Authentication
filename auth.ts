import NextAuth from 'next-auth';

import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';

import authConfig from '@/auth.config';
import { getUserById } from '@/data/user';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login", // next-auth will redirect to this route instead of the custom page
    error: "/auth/error"
  },

  // this will check if user logged in with an OAuth account
  // and will update the emailVerified field with new Date()
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id
        },
        data: {
          emailVerified: new Date()
        }
      })
    },
  },

  callbacks: {
    // async signIn({ user }) {
    //   const exisitingUser = await getUserById(user.id)

    //   if(!exisitingUser || !exisitingUser.emailVerified) { // if user doesnt exist or if user email is not verified dont allow user login
    //     return false
    //   }

    //   return true
    // },

    async session({ token, session }) {
      if (token.sub && session.user) {
        // this allows for the id thats stored in the token to be showed in the session
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },

    // this returns majority of user data
    async jwt({ token }) {
      if (!token.sub) return token; // if !token.sub means user is logged out

      const exisitingUser = await getUserById(token.sub);

      if (!exisitingUser) return token;

      token.role = exisitingUser.role; // how to return the logged in user role

      return token;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
