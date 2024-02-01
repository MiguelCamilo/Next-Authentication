'use client';

import * as React from 'react';
import { PuffLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';

import { tokenVerification } from '@/actions/token-verification';

import { FormError } from '@/components/form-error';
import { FormSuccess } from '../form-success';
import { CardWrapper } from '@/components/auth/card-wrapper';

export const NewVerificationForm = () => {
  const [isPending, setIsPending] = React.useState<boolean | undefined>(false);
  const [error, setError] = React.useState<string | undefined>('');
  const [success, setSuccess] = React.useState<string | undefined>('');

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleEmailVerificationSubmit = React.useCallback(() => {
    setIsPending(!isPending)
    if(success || error) return // if theres a success || error then break

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
        setIsPending(!isPending)
      })
  }, [token, success, error, setIsPending, isPending]);

  // on component load the onSubmit will fire to check
  // the token in the browser url
  React.useEffect(() => {
    handleEmailVerificationSubmit();
  }, [handleEmailVerificationSubmit]);

  return (
    <CardWrapper
      headerLabel="Email verification in process..."
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      backButtonVariant={'outline'}
      isBackButtonDisabled={isPending}
    >
      <div className="flex items-center w-full justify-center my-5">
        {!success && !error && <PuffLoader color="gray" />}
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
};
