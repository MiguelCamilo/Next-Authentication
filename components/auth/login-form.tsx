'use client'; // since we're using a hook (useForm)

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

import { PuffLoader } from 'react-spinners';

import { CardWrapper } from '@/components/auth/card-wrapper';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { TwoFactorCodeForm } from '@/components/auth/two-factor-form';

// server actions from next js
import { login } from '@/actions/login';

export const LoginForm = () => {
  const searchParams = useSearchParams();

  const [isPending, startTransition] = React.useTransition();
  const [showTwoFactor, setShowTwoFactor] = React.useState<boolean | undefined>(
    false
  );
  const [error, setError] = React.useState<string | undefined>('');
  const [success, setSuccess] = React.useState<string | undefined>('');

  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider'
      : '';

  // useFrom is similar to formik form validation
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLoginSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          } else if (data?.success) {
            setSuccess(data.success);
          } else if (data?.twoFactor) {
            setShowTwoFactor(!showTwoFactor);
          }
        })
        .catch((error) => {
          console.error(error);
          setError('Something went wrong, try again.');
        });
    });
  };

  return (
    <>
      {showTwoFactor ? (
        <TwoFactorCodeForm
          form={form}
          success={success}
          error={error}       
          isPending={isPending}
          handleLoginSubmit={handleLoginSubmit}
        />
      ) : (
        <CardWrapper
          //TODO: render the users name if user has logged in before by using localStorage

          headerLabel="Welcome"
          headerLabelClassName="text-muted-foreground text-xs text-center"
          backButtonLabel="Dont have an account?"
          backButtonHref="/auth/register"
          showSocial={!showTwoFactor}
        >
          {isPending ? (
            <div className="flex justify-center items-center p-20">
              <PuffLoader color="gray" />
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleLoginSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="email"
                            placeholder="email.here@example.com"
                          />
                        </FormControl>
                        {/* to change the default FormMessage go into the LoginSchema */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="password"
                            placeholder="* * * * * * * *"
                          />
                        </FormControl>
                        <Button
                          variant={'link'}
                          size={'sm'}
                          asChild
                          className="px-0 font-normal"
                        >
                          <Link href={'/auth/reset'}>Forgot password?</Link>
                        </Button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormError message={error || urlError} />
                <FormSuccess message={success} />
                <Button type="submit" className="w-full" disabled={isPending}>
                  Login
                </Button>
              </form>
            </Form>
          )}
        </CardWrapper>
      )}
    </>
  );
};
