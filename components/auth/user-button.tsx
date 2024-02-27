'use client';

import { useCurrentUser } from '@/hooks/use-current-user';

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
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import { LogOutButton } from '@/components/auth/logout-button';

import { FaUser } from 'react-icons/fa';
import { ExitIcon } from '@radix-ui/react-icons';
import { AiFillEdit } from 'react-icons/ai';

export const UserButton = () => {
  const user = useCurrentUser();

  //todo: impliment modal for profile picture update

  const onProfileImageClick = () => {};

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
              className="flex flex-row"
              onClick={(event) => event.stopPropagation()}
            >
              <AiFillEdit className="h-4 w-4 mr-2 text-gray-400" />
              Update Picture
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>Test</DialogHeader>
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
