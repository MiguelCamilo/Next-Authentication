import { Button } from '@/components/ui/button';
import { LoginButton } from '@/components/auth/login-button';

import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

const fonts = Poppins({
  subsets: ['latin-ext'],
  weight: ['600'],
});

export default function Home() {
  return (
    // gradient styling: https://tailwindcss.com/docs/gradient-color-stops
    <main className="flex flex-col h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-200 to-stone-700">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            'text-6xl font-semibold text-white drop-shadow-md',
            fonts.className
          )}
        >
          Next Auth 🔐
        </h1>
        <p className="text-white text-lg">A simple authentication service</p>
        <div>
          <LoginButton mode='modal' asChild>
            <Button size={"lg"} variant={"secondary"}>Sign in</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}

/*
A client component is a component that is rendered on the client-side, meaning it is executed in the user's browser. This includes components that handle user interactions, perform client-side data fetching, 
or manipulate the DOM. Client components are typically written using React and are responsible for the interactive and dynamic aspects of a web application.

On the other hand, a server component is a component that is rendered on the server-side. It is executed on the server before the page is sent to the client. Server components are useful for tasks that need to be performed on the server, 
such as fetching data from an external API, accessing a database, or performing server-side rendering. They can also be used to implement server-side logic that should not be exposed to the client.

Next.js provides a special component called the "Page Component" that acts as a server component. It is responsible for rendering the initial HTML on the server and sending it to the client. 
This allows Next.js to provide features like server-side rendering and static site generation.

To summarize, client components are executed in the user's browser and handle client-side interactions, while server components are executed on the server and handle server-side tasks like data fetching and server-side rendering. 
*/
