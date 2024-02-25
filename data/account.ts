import { db } from '@/lib/db';

export const getAccountTypeByUserId = async (userId: string | undefined) => {

  if (typeof userId === 'undefined') {
    console.error('UserId is undefined');
    return {
      error: 'UserId is undefined'
    }
  }

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
