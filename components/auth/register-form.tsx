'use client' // since we're using a hook (useForm)
import * as React from 'react';

import * as z from 'zod';
import { RegisterSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

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
import { register } from '@/actions/register'

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = React.useState<string | undefined>("")
  const [success, setSuccess] = React.useState<string | undefined>("")

    // useFrom is similar to formik form validation 
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleRegisterSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")
    
    startTransition(() => {
        register(values)
        .then((data) => {
          setError(data.error)
          setSuccess(data.success)
        })
    })
  }

  return (
    <CardWrapper
      headerLabel="Welcome back!"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form
        {...form}
      >
        <form
            onSubmit={form.handleSubmit(handleRegisterSubmit)}
            className='space-y-6'
        >
            <div className='space-y-4'>
                <FormField 
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>                            
                            <FormControl>
                                <Input 
                                    {...field}
                                    disabled={isPending}
                                    type='email'
                                    placeholder='email.here@example.com'                                    
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
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>                            
                            <FormControl>
                                <Input 
                                    {...field}
                                    disabled={isPending}
                                    type='password'
                                    placeholder='* * * * * * * *'                                                                      
                                />
                            </FormControl>   
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
                type='submit'
                className='w-full'   
                disabled={isPending}             
            >
                Login
            </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
