import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    
    async session({ token, session }) {
        if(token.sub && session.user) {
            session.user.id = token.sub            
        }
        return session
    },

    // this returns majority of user data
    async jwt({ token }) {        
        return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
