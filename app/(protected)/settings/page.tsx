'use client'

import { useSession, signOut } from 'next-auth/react';

const Settings = () => {
    const session = useSession()
    return ( 
        <div>            
            <form>
                <button
                    onClick={() => {signOut()}}
                    type='submit'
                >
                    Sign out
                </button>
            </form>
        </div>
     );
}
 
export default Settings;

{/**
// how to use a server action in a client component
import { useSession } from 'next-auth/react';
import { auth, signOut } from '@/auth';

const Settings = async () => {
    const session = await auth()

    return ( 
        <div>
            {JSON.stringify(session)}
            <form action={async () => {
                "use server"
                await signOut()
            }}>
                <button
                    type='submit'
                >
                    Sign out
                </button>
            </form>
        </div>
     );
}
 
export default Settings;
*/}