'use client'; // since we're using a hook (useForm)

import * as React from 'react';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

import { PuffLoader } from 'react-spinners';
import { IoIosArrowRoundBack } from "react-icons/io";

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

// server actions from next js
import { useTransition } from 'react';
import { login } from '@/actions/login';

export const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = React.useState<string | undefined>('');
  const [success, setSuccess] = React.useState<string | undefined>('');

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
      login(values).then((data) => {
        setError(data?.error);        
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      //TODO: render the users name if user has logged in before by using localStorage

      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      icon={IoIosArrowRoundBack}
      iconClassName='h-5 w-5'
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
                    <FormLabel>Enter your email</FormLabel>
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
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button 
                type="submit" 
                className="w-full" 
                disabled={isPending}
                >  
              Reset password
            </Button>
          </form>
        </Form>
      )}
    </CardWrapper>
  );
};
