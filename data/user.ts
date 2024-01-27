import { db } from '@/lib/db';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ 
      where: { 
        email 
      } 
    });

    if(!user) console.log(`No user found with email provided: ${email}`)

    return user;
  } catch (error) {
    console.error(`Unable to fetch user ${error}`)
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch (error) {
    console.log(`No user found with provided id: ${error}`)
    return null;
  }
};
