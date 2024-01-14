import NextAuth from 'next-auth';

import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';

import authConfig from '@/auth.config';
import { getUserById } from '@/data/user';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    
    async session({ token, session }) {        

        // this allows for the id thats stored
        // in the token to be showed in the session        
        if(token.sub && session.user) {
            session.user.id = token.sub                              
        }                
        return session
    },

    // this returns majority of user data
    async jwt({ token }) {

        if(!token.sub) return token // if !token.sub it means user is logged out

        const exisitingUser = await getUserById(token.sub)

        if(!exisitingUser) return token

        token.role = exisitingUser.role // how to return the logged in user role

        return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
