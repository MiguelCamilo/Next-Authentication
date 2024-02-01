'use server';

import * as z from 'zod';
import bcryptjs from 'bcryptjs';

import { db } from '@/lib/db';
import { NewPasswordSchema } from '@/schemas';
import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';

/**
 * Verifies the validity of a password reset request, ensuring the provided token is valid,
 * the associated email exists, and the new password meets the required criteria.
 * @param values - An object containing the new password and its confirmation.
 * @param token - The unique token associated with the password reset request.
 * @returns An object with an error message if the verification fails, or undefined if successful.
 */
export const newPasswordVerification = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return {
      error: 'Missing token.',
    };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    console.error(validatedFields.error);
    return {
      error: 'Invalid fields',
    };
  }

  const { password, confirmedPassword } = validatedFields.data;

  const exisitingToken = await getPasswordResetTokenByToken(token);
  if (!exisitingToken) return { error: 'Inavlid Token.' };

  const checkTokenExpiration = new Date(exisitingToken.expires) < new Date();

  if (checkTokenExpiration) {
    return {
      error: 'Token has expired. Attempt password reset process again.',
    };
  }

  // checks if the email that token is attached too still exist, if not break
  const exisitingUser = await getUserByEmail(exisitingToken.email);
  if (!exisitingUser) return { error: 'Email does not exist.' };

  if (password !== confirmedPassword) {
    return {
      error: 'Passwords do not match, re-enter passwords.',
    };
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  await db.user.update({
    where: {
      id: exisitingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  // delete token reset token after password reset success
  await db.passwordResetToken.delete({
    where: {
      id: exisitingToken.id,
    },
  });

  return { success: 'Password reset succesfully!' };
};
