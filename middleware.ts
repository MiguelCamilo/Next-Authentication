import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  let callbackUrl = nextUrl.pathname;
  // this concatenates the query string ex: callbackUrl = example.com/auth/login and nextUrl = ?next=/dashboard
  // then it will concatenate to example.com/auth/login?next=/dashboard and return a
  // string like this example.com/auth/login?next=/dashboard
  callbackUrl += nextUrl.search;
  const encodedCallBackUrl = encodeURIComponent(callbackUrl);

  if (isApiAuthRoute) return null;

  if (isAuthRoute) {
    if (isLoggedIn) {
      // using "nextUrl" creates an absolute URL since our URL is not
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`, nextUrl)
    );
  }

  return null;
});

export const config = {
  // with the recommended matcher, all routes are protected by Clerk's authentication middleware
  // every route will invoke middleware
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
