import { v4 as uuidv4 } from 'uuid';

import { db } from './db';
import { getVerificationTokenByEmail } from '@/data/verification-token';

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  // setting tokem to expire in 1hr
  const expires = new Date(new Date().getTime() + 3600 * 1000); // calculates the number of milliseconds in 1hr

  const exisitingToken = await getVerificationTokenByEmail(email);

  if (exisitingToken) {
    await db.verificationToken.delete({
      where: {
        id: exisitingToken.id,
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
 * The uuid package is a popular npm package that stands for "Universally Unique Identifier."
 * It provides a way to generate unique identifiers, also known as UUIDs or GUIDs, in JavaScript.
 */
