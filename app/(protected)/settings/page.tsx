'use client';

import { logout } from '@/actions/logout';
import { useCurrentUser } from '@/hooks/use-current-user';

const Settings = () => {
  const user = useCurrentUser();

  return (
    <div className="bg-white p-10 rounded-xl">
      <button
        onClick={() => { logout() }}
        type="submit"
      >
        Sign out
      </button>
    </div>
  );
};

export default Settings;

{
  /**
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
*/
}
