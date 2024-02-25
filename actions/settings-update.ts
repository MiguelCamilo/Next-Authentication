'use server'

import * as z from 'zod'

import { db } from '@/lib/db'
import { currentUser } from '@/lib/auth'
import { getUserByEmail, getUserById } from '@/data/user'
import { SettingsSchema } from '@/schemas'
import { generateVerificationToken } from '@/lib/tokens'

export const settingsUpdate = async (values: z.infer<typeof SettingsSchema>) => {
    const user = await currentUser()

    if(!user) {
        return { error: 'Unauthorized' }
    }

    const dbUser = await getUserById(user.id)

    if(!dbUser) return { error: 'Unauthorized' }

    if(user.isOAuth) { // checks if user is an OAuth user and does not allow for email, passwords and 2FA to be updated
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }

    if(values.email && values.email !== user.email) { // checks if email is already in use by checking the value email provided
        const existingUser = await getUserByEmail(values.email) 

        if(existingUser && existingUser.id !== user.id) {
            return { error: 'Email already in use.' }
        }

        const verificationToken = await generateVerificationToken(values.email)
        
    }

    await db.user.update({
        where: {
            id: dbUser.id
        },
        data: {
            ...values,
        }
    })

    return { success: 'Settings Updated' }
}