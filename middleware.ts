import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from "@/routes"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    // const { nextUrl }
//   const isLoggedIn = !!req.auth
//   req.nextUrl.pathname
});

export const config = {
// with the recommended matcher, all routes are protected by Clerk's authentication middleware 
// every route will invoke middleware
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
