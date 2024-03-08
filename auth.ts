import NextAuth from 'next-auth';

import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';

import authConfig from '@/auth.config';
import { getUserById } from '@/data/user';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
import { getAccountTypeByUserId } from '@/data/account';

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
    async signIn({ user, account }) {
      // allow OAuth login without email verification since providers verify email
      if(account?.provider !== 'credentials') return true

      const exisitingUser = await getUserById(user.id)

      if(!exisitingUser || !exisitingUser.emailVerified) { // if user doesnt exist or if user email is not verified dont allow user login
        return false
      }

      // 2FA check 
      if (exisitingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(exisitingUser?.id);

        if (!twoFactorConfirmation) return false

        // delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id }
        })
      }

      return true
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        // this allows for the id thats stored in the token to be showed in the session
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if(session.user) {
        session.user.name = token.name;     
        session.user.email = token.email;        
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },

    // this returns majority of user data
    async jwt({ token }) {
      if (!token.sub) return token; // if !token.sub means user is logged out

      const exisitingUser = await getUserById(token.sub);

      if (!exisitingUser) return token;

      const exisitingAccount = await getAccountTypeByUserId(exisitingUser.id);

      // by turning this into a boolean it checks if exisitingAccount is true then token.isOAuth is true
      token.isOAuth = !!exisitingAccount
      token.name = exisitingUser.name
      token.email = exisitingUser.email

      /**
       * the reason we can't pass the profileImage through jwt
       * is due to the size of the profilImage string and it being
       * stored in cookies cause issues due to its 45kb limit 
       */
      // token.profileImage = exisitingUser.profileImage 

      token.role = exisitingUser.role; // how to return the logged in user role
      token.isTwoFactorEnabled = exisitingUser.isTwoFactorEnabled; // how to return the logged in user 2FA status

      return token;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
