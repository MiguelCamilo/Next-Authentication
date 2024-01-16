'use client';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

import { signIn } from 'next-auth/react'; // this signIn is only for use in a client component, unlike in the server actions
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

const Social = () => {
  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex flex-col w-full text-center space-y-4">
      <p className="text-xs text-gray-400">Continue with</p>
      <div className="flex items-center w-full gap-x-2">
        <Button
          size={'lg'}
          className="w-full"
          variant={'outline'}
          onClick={() => {
            onClick('google');
          }}
        >
          <FcGoogle className="h-5 w-5" />
        </Button>

        <Button
          size={'lg'}
          className="w-full"
          variant={'outline'}
          onClick={() => {
            onClick('github');
          }}
        >
          <FaGithub className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Social;
