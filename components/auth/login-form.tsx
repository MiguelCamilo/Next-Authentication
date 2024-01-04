'use client' // since we're using a hook (useForm)

import * as z from 'zod';
import { LoginSchema } from '@/schemas';
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

export const LoginForm = () => {
    // useFrom is similar to formik form validation 
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <CardWrapper
      headerLabel="Welcome back!"
      backButtonLabel="Dont have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form
        {...form}
      >
        <form
            onSubmit={form.handleSubmit(() => {})}
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
                                    type='password'
                                    placeholder=''                                                                      
                                />
                            </FormControl>                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
