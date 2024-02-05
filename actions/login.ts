'use server';

import * as z from 'zod';
import { AuthError } from 'next-auth';

import { db } from '@/lib/db';
import { sendVerificationEmail, sendTwoFactorCodeEmail } from '@/lib/mail';
import { generateVerificationToken, generateTwoFactorToken } from '@/lib/tokens';

import { signIn } from '@/auth';
import { LoginSchema } from '@/schemas';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import { getUserByEmail } from '@/data/user';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';


/**
 * Implements the logic for handling 2FA during login. If the user has 2FA enabled and has inputted a 2FA token, the code validates the token. 
 * If the token is valid and hasn't expired, the code deletes the token from the database and creates a new 2FA confirmation. If the token isn't valid or has expired, 
 * the code returns an error message. If the user hasn't inputted a 2FA token, the code generates a new token, sends a 2FA code email to the user, and returns a flag indicating that 2FA is required
 * @param values 
 * @returns 
 */
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    };
  }

  const { email, password, code: userInputedToken } = validatedFields.data;

  const exisitingUser = await getUserByEmail(email)

  if(!exisitingUser || !exisitingUser.email || !exisitingUser.password) {
    return {
      error: 'Email does not exist.',
    }
  }

  if(!exisitingUser?.emailVerified) { // if email not verified resend verif token
    const verificationToken = await generateVerificationToken(exisitingUser.email)

    await sendVerificationEmail(verificationToken.email, verificationToken.token, exisitingUser.name)

    return {
      success: 'Verification email sent, please verify your email before logging in.',  
    }
  }

  // check to see if user has 2FA enabled before login
  if (exisitingUser.isTwoFactorEnabled && exisitingUser.email) {
    if(userInputedToken) {      
      const twoFactorToken = await getTwoFactorTokenByEmail(exisitingUser.email)

      if(!twoFactorToken) return { error: 'Invalid Code.' }

      if(twoFactorToken.token !== userInputedToken) { // check if provided 2FA token matches token in DB
        return {
          error: 'Code provided is incorrect.'
        }
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date()
      if(hasExpired) return { error: 'Code has expired' }

      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id
        }
      })

      const exisitingConfirmation = await getTwoFactorConfirmationByUserId(exisitingUser.id)

      if(exisitingConfirmation) { // delete the exisitng confirmation if theres an exisitng one already
        await db.twoFactorConfirmation.delete({
          where: {
            id: exisitingConfirmation.id
          }
        })
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: exisitingUser.id
        }
      })

    } else {
      const twoFactorToken = await generateTwoFactorToken(exisitingUser.email)

      await sendTwoFactorCodeEmail(twoFactorToken.email, twoFactorToken.token) // send 2FA email to the email that the token is attached too
  
      return { twoFactor: true }
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
