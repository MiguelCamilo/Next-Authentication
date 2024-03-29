'use server';

import bcryptjs from 'bcryptjs';
import * as z from 'zod';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { RegisterSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    };
  }

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcryptjs.hash(password, 10);

  // confirm if email is not taken
  const exisitingUser = await getUserByEmail(email);

  if (exisitingUser) return { error: 'Email already in use!' };

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,      
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token, name);

  return {
    success: 'A verification email has been sent. Please check your email.',
  };    
}