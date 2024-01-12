import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';

import bcryptjs from "bcryptjs"

import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';

export default {
  providers: [
    GitHub,
    Google,
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const existingUser = await getUserByEmail(email);
          // if its not an exisitingUser in the db or a
          // existingUser without a pwd(google/github OAuth) dont move forward
          if (!existingUser || !existingUser.password) return null;

          // if success, confirm pwd
          const passwordMatch = await bcryptjs.compare(
            password,
            existingUser.password
          );

          if (passwordMatch) return existingUser;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

/**
 * Data Validation: The LoginSchema allows you to define a set of rules and
 * constraints for validating user input during the login process.
 * This helps ensure that the data provided by the user meets the expected format
 * and requirements. 
 * 
 * By validating the data before it is processed by
 * the authentication providers, you can prevent potential issues
 * or security vulnerabilities caused by invalid or malicious input.
 */
