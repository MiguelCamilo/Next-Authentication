'use client'; // since we're using a hook (useForm)

import * as React from 'react';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { NewPasswordSchema } from '@/schemas';
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

import { useSearchParams } from 'next/navigation';

// server actions from next js
import { newPasswordVerification } from '@/actions/new-password-verification';

export const NewPasswordForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [error, setError] = React.useState<string | undefined>('');
  const [success, setSuccess] = React.useState<string | undefined>('');

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  // useFrom is similar to formik form validation
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
      confirmedPassword: '',
    },
  });

  const handleCreateNewPasswordSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      newPasswordVerification(values, token)
        .then((data) => {          
          setError(data?.error)
          setSuccess(data?.success)
        })
    });
  };

  return (
    <CardWrapper      
      cardTitle='Please, enter a new password below.'
      headerLabel=""
      backButtonLabel="Back to login"
      backButtonVariant={"outline"}
      backButtonHref="/auth/login"
      isBackButtonDisabled={isPending}
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
            onSubmit={form.handleSubmit(handleCreateNewPasswordSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              {/* enter new password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type="password"
                        placeholder="• • • • • • • • •"
                      />
                    </FormControl>
                    {/* to change the default FormMessage go into the ResetSchema */}
                    <FormMessage />
                  </FormItem>
                )}
              />   
              
            {/* confirm new password */}
              <FormField
                control={form.control}
                name="confirmedPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm new password*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type="password"
                        placeholder="• • • • • • • • •"
                      />
                    </FormControl>
                    {/* to change the default FormMessage go into the ResetSchema */}
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
              Save
            </Button>
          </form>
        </Form>
      )}
    </CardWrapper>
  );
};
