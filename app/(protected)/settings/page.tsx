import { auth } from '@/auth';
import { signOut } from '@/auth';

const Settings = async () => {
    const session = await auth()    

    return ( 
        <div>
            {JSON.stringify(session)}
            <form action={async () => {
                "use server"
                await signOut() // this is signOut is for server components
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