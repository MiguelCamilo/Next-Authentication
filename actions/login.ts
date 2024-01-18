'use server';

import * as z from 'zod';
import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { generateVerificationToken } from '@/lib/tokens';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    };
  }

  const { email, password } = validatedFields.data;

  const exisitingUser = await getUserByEmail(email)

  if(!exisitingUser || !exisitingUser.email || !exisitingUser.password) {
    return {
      error: 'Email does not exist.',
    }
  }

  if(!exisitingUser?.emailVerified) { // if email not verified resend verif token
    const verificationToken = await generateVerificationToken(exisitingUser.email)

    return {
      success: 'Verification email sent!',
      verificationToken
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {    
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Incorrect email or password.' };
        default:
          return { error: 'Something went wrong, try again.' };
      }
    }

    throw error;
  }
};
