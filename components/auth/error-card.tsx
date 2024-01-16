'use client'

import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ErrorCard = () => {
  return (
    <div key="1" className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white  py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Authentication Error
            </h2>
            <p className="text-center text-sm text-gray-600 mb-5">
              An error occurred during authentication.
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <Button className="w-full bg-black text-white uppercase">
                <Link href="#">back to login</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorCard;
