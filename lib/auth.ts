import { auth } from '@/auth';

/**
 * Returns the current user from the session object
 * for server components, server actions and API routes
 * @returns 
 */
export const currentUser = async () => {
    const session = await auth()

    // when using the auth from next-auth
    // we access the user data from the session object
    // unlike the useCurrentUser hook
    return session?.user
}

/**
 * Returns the current user's role
 * from the session object for server components,
 * server actions and API routes
 * @returns 
 */
export const currentRole = async () => {
    const session = await auth()

    return session?.user?.role
}
