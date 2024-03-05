import { UserRole } from '@prisma/client';
import NextAuth, { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
    profileImage: string;
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser    
  }
}

/**
 * Type Safety for the user role
 */
/**
 * extends the DefaultSession["user"] type,
 * which means it inherits the properties and types from the DefaultSession
 * type's user property
 */
