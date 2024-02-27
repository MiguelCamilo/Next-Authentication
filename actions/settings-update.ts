'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs'

import { db } from '@/lib/db'
import { currentUser } from '@/lib/auth'
import { sendVerificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/tokens'

import { SettingsSchema } from '@/schemas'
import { getUserByEmail, getUserById } from '@/data/user'

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
        await sendVerificationEmail(verificationToken.email, verificationToken.token)

        return { success: 'Verfiication email sent. Please verify your email to update your settings.'}
    }

    if(values.password && values.newPassword && dbUser.password) { // checks if password and new password are provided and if the user has a password
        // compares if the provided current password is the correct password in db
        const passwordMatch = await bcrypt.compare(values.password, dbUser.password)

        if(!passwordMatch) return { error : 'Current password is incorrect.' }

        const hashedPassword = await bcrypt.hash(values.newPassword, 10)
        values.password = hashedPassword // updates the password value we are passing back to the db with the hashedPassword
        values.newPassword = undefined // removes the new password value from the object since db does not have a newPassword field
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