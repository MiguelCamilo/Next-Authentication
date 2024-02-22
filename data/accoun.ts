import { db } from '@/lib/db';

export const getAccountTypeByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId }
    });

    return account;
    
  } catch (error) {
    console.error(error);
    return {
      error: 'Unable to retrieve user account type.',
    };
  }
};
