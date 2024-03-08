'use client';

import * as React from 'react';
import * as z from 'zod';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SettingsSchema } from '@/schemas';
import { settingsUpdate } from '@/actions/settings-update';
import { useCurrentUser } from '@/hooks/use-current-user';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ImageUpload from '@/components/image-upload';
import { LogOutButton } from '@/components/auth/logout-button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FormSuccess } from '@/components/form-success';
import { FormError } from '@/components/form-error';

import { FaUser } from 'react-icons/fa';
import { ExitIcon } from '@radix-ui/react-icons';
import { AiFillEdit } from 'react-icons/ai';

export const UserButton = () => {
  const [isPending, startTransition] = React.useTransition();
  const [success, setSuccess] = React.useState<string | undefined>('');
  const [error, setError] = React.useState<string | undefined>('');

  const user = useCurrentUser();
  const { update } = useSession();  

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      role: user?.role || undefined,   
      image: user?.image || undefined
    },
  });

  const updateUserProfileImage = (values: z.infer<typeof SettingsSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      settingsUpdate(values)
        .then((response) => {          
          update();
          if (response?.success) {
            setSuccess(response?.success);
          }
          if (response?.error) {
            setError(response?.error);
          }
        })
        .catch((error) => {
          console.error(`Error updating settings: ${error}`);
          setError(`Unable to update settings`);
        });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image} />
          <AvatarFallback className="bg-gray-400">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40" align="end">
        {/* <DropdownMenuItem>
          <Dialog>
            <DialogTrigger
              className="flex flex-row w-full"
              onClick={(event) => event.stopPropagation()}
            >
              <AiFillEdit className="h-4 w-4 mr-2 text-gray-400" />
              Update Picture
            </DialogTrigger>

            <DialogContent>
              <DialogHeader className="font-bold text-xl">
                Edit Profile Picture
              </DialogHeader>
              <DialogDescription>

                <div className="space-y-4">                  
                  <FormSuccess message={success} />
                  <FormError message={error} />
                </div>

                <Form {...form}>
                  <form
                    className="space-y-4"
                    onSubmit={form.handleSubmit(updateUserProfileImage)}
                  >
                    <FormMessage />
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <ImageUpload
                              value={field.value}
                              onChange={field.onChange}
                              disabled={isPending}
                              label="Upload Profile Image"
                            />
                          </FormControl>                          
                        </FormItem>
                      )}
                    />
                    <Button onClick={(event) => event.stopPropagation()} type="submit" className="w-full">
                      Update
                    </Button>
                  </form>
                </Form>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem> */}

        <LogOutButton>
          <DropdownMenuItem className="hover:cursor-pointer">
            <ExitIcon className="h-4 w-4 mr-2 text-red-600" />
            Log out
          </DropdownMenuItem>
        </LogOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
