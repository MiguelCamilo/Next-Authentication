'use client';

import * as React from 'react';
import { PuffLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';

import { tokenVerification } from '@/actions/token-verification';

import { FormError } from '@/components/form-error';
import { FormSuccess } from '../form-success';
import { CardWrapper } from '@/components/auth/card-wrapper';

export const NewVerificationForm = () => {
  //TODO: while email verification is processing disable login button

  const [isLoading, setIsLoading] = React.useState<boolean | undefined>(false);
  const [error, setError] = React.useState<string | undefined>('');
  const [success, setSuccess] = React.useState<string | undefined>('');

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleEmailVerificationSubmit = React.useCallback(() => {
    setIsLoading(true);
    
    if (!token) {
      setError('Missing token.');
      return;
    }
    tokenVerification(token)
      .then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      })
      .catch((error) => {
        setError('Something went wrong.');
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  React.useEffect(() => {
    handleEmailVerificationSubmit();
  }, [handleEmailVerificationSubmit]);

  return (
    <CardWrapper
      headerLabel="Email verification in process..."
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      backButtonVariant={'outline'}
    >
      <div className="flex items-center w-full justify-center my-5">
        {isLoading ? (
          <PuffLoader color="gray" />
        ) : (
          <>
            <FormError message={error} />
            <FormSuccess message={success} />
          </>
        )}
      </div>
    </CardWrapper>
  );
};
