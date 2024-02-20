'use client';

import { logout } from '@/actions/logout';

interface LogOutButtonProps {
  children?: React.ReactNode;
}

export const LogOutButton = ({ children }: LogOutButtonProps) => {
  return (
    <span
      onClick={() => {
        logout();
      }}
    >
      {children}
    </span>
  );
};
