'use client';

import * as React from 'react';
import * as z from 'zod';
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
  FormLabel,
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
import ImageUpload from '@/components/image-upload';
import { LogOutButton } from '@/components/auth/logout-button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import { FaUser } from 'react-icons/fa';
import { ExitIcon } from '@radix-ui/react-icons';
import { AiFillEdit } from 'react-icons/ai';

export const UserButton = () => {
  const [isPending, startTransition] = React.useTransition();

  const user = useCurrentUser();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      profileImage: '' // user?.profileImage
    }
  })

  const onProfileImageClick = () => {

    startTransition(() => {

    })
  }; 

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className="bg-gray-400">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem>
          <Dialog>
            {/* stopPropagation is used due to embedding a clickable component within another */}
            <DialogTrigger
              className="flex flex-row w-full"
              onClick={(event) => event.stopPropagation()}              
            >
              <AiFillEdit className="h-4 w-4 mr-2 text-gray-400" />
              Update Picture
            </DialogTrigger>

            <DialogContent>
              <DialogHeader className='font-bold text-xl'>Edit Profile Picture</DialogHeader>
              <DialogDescription>
                <Form
                  {...form}
                >
                  <form 
                    className='space-y-4'
                    onSubmit={form.handleSubmit(onProfileImageClick)}
                  >
                    <FormField
                      control={form.control}
                      name='profileImage'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <ImageUpload 
                              {...field}
                              label='Upload Profile Image'
                              value={field.value}
                              disabled={isPending}
                              onChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    >
                      
                    </FormField>
                  </form>

                </Form>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>

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
