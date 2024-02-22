'use client';

import * as z from 'zod'
import * as React from 'react'

import { useCurrentUser } from '@/hooks/use-current-user';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';

import { SettingsSchema } from '@/schemas';
import { settingsUpdate } from '@/actions/settings-update';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardHeader,CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';


const Settings = () => {
  const [isPending, startTransition] = React.useTransition();
  const [error, setError] = React.useState<string | undefined>('');
  const [success, setSuccess] = React.useState<string | undefined>('');

  const user = useCurrentUser();
  const { update } = useSession() // allows up the session after user updates settings
  
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
    }
  })

  const onSettingsUpdate = (values: z.infer<typeof SettingsSchema>) => {
    setSuccess('');
    setError('');

    startTransition(() => {
      settingsUpdate(values)
        .then((response) => {
          update()
          setError(response?.error)
          setSuccess(response?.success)
        })
    })
  }

  return (
    <Card className="max-w-[600px]">
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>
          Settings ⚙️
        </p>
      </CardHeader>

      <CardContent>

      </CardContent>
    </Card>
  );
};

export default Settings;
