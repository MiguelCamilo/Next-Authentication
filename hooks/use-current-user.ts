import { useSession } from 'next-auth/react';

export const useCurrentUser = () => {
    const session = useSession()

    // returns the logged in user data
    // without having to use the session object in each component
    return session.data?.user
}
