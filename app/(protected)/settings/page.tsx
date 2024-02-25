'use client';

import * as z from 'zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';

import { UserRole } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCurrentUser } from '@/hooks/use-current-user';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { FormError } from '@/components/form-error';

const Settings = () => {
  const user = useCurrentUser();
  const { update } = useSession(); // allows up the session after user updates settings

  const [isPending, startTransition] = React.useTransition();
  const [error, setError] = React.useState<string | undefined>('');

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      role: user?.role || undefined,
      password: undefined,
      newPassword: undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled,
    },
  });

  const onSettingsUpdate = (values: z.infer<typeof SettingsSchema>) => {
    // todo: disable submit if no changes have been made
    setError('');

    startTransition(() => {
      settingsUpdate(values)
        .then((response) => {
          if (response?.error) {
            toast({ title: `${response?.error}`, variant: 'destructive' });
          }
          if (response?.success) {
            update();
            toast({ title: `${response.success}`, variant: 'success' });
          }
        })
        .catch((error) => {
          setError(`Unable to update settings: ${error}`);
        });
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Settings ⚙️</p>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <FormError message={error} />
        </div>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(onSettingsUpdate)}
          >
            <div className="space-y-4">
              {/* name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="First Last Name"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {user?.isOAuth === false && (
                <>
                  {/* email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="example@email.com"
                            disabled={isPending}
                          />
                        </FormControl>
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
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="* * * * * * * *"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* new password */}
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="* * * * * * * *"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* role */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Request access for role change" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                        <SelectItem value={UserRole.USER}>User</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {user?.isOAuth === false && (
                <>
                  {/* 2FA */}
                  <FormField
                    control={form.control}
                    name="isTwoFactorEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Two Factor Authentication</FormLabel>
                          <FormDescription>
                            Enable two factor authentication for added security.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            disabled={isPending}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Settings;
