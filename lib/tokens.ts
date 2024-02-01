import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid';

import { db } from './db';
import { getVerificationTokenByEmail } from '@/data/verification-token';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  // setting token to expire in 1hr
  const expires = new Date(new Date().getTime() + 3600 * 1000); // calculates the number of milliseconds in 1hr

  const exisitingToken = await getVerificationTokenByEmail(email);

  if (exisitingToken) {
    await db.verificationToken.delete({
      where: {
        id: exisitingToken?.id,
      },
    });
  }

  const newVerificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return newVerificationToken;
};

/**
 * Generates password reset token and checks if user has an existing verified
 * reset token and deletes if verified. 
 */
export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();

    // setting token to expire in 1hr
    const expires = new Date(new Date().getTime() + 3600 * 1000); // calculates the number of milliseconds in 1hr

    const exisitingUser = await getPasswordResetTokenByEmail(email);

    if(exisitingUser) {
      await db.passwordResetToken.delete({
        where: {
          id: exisitingUser?.id
        }
      })
    }

    const newPasswordResetToken = await db.passwordResetToken.create({
      data: {
        email,
        token,
        expires
      }
    })

    return newPasswordResetToken
}

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString()
  // setting token to expire in 15mins
  const expires = new Date(new Date().getTime() + 15 * 60 * 1000);

  const exisitingToken = await getTwoFactorTokenByEmail(email)

  // delete existing token if a new one gets created(when the func gets called)
  if(exisitingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: exisitingToken.id
      }
    })
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return twoFactorToken
}

/**
 * The uuid package is a popular npm package that stands for "Universally Unique Identifier."
 * It provides a way to generate unique identifiers, also known as UUIDs or GUIDs, in JavaScript.
 */
