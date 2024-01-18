"use server"

import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { getVerificationTokenByToken } from '@/data/verification-token'

export const tokenVerification = async (token: string) => {
    const exisitingToken = await getVerificationTokenByToken(token)

    if(!exisitingToken) {
        return {
            error: 'Token does not exist.'
        }
    }

    const checkTokenExpiration = new Date(exisitingToken.expires) < new Date()

    if(checkTokenExpiration) {
        return {
            error: 'Verification token has expired.'
        }
    }

    const exisitingUser = await getUserByEmail(exisitingToken.email)
    
    // if there is no existing user email tied to this token
    // it could be user has changed their email
    if(!exisitingUser) {
        return {
            error: 'Email does not exist.'
        }
    }

    await db.user.update({
        where: {
            id: exisitingUser.id
        },
        data: {
            emailVerified: new Date(),
            email: exisitingToken.email
            // the reason we are updating the email
            // in the db is because if the user decides
            // they want to update their email, we will first
            // send a verification email with a new token to verify
            // this is them attempting to update
        }
    })

    // delete token after email has been verified
    await db.verificationToken.delete({
        where: {
            id: exisitingToken.id
        }
    })

    return {
        success: 'Email has been verified.'
    }
}
