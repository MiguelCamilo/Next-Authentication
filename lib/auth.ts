import { auth } from '@/auth';

export const currentUser = async () => {
    const session = await auth()

    // when using the auth from next-auth
    // we access the user data from the session object
    // unlike the useCurrentUser hook
    return session?.user
}
