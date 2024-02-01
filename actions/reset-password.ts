'use server'

import * as z from 'zod'

import { ResetSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'

import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/tokens'

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values)

    if(!validatedFields.success) {
        return { error: 'Invalid email.' }
    }

    const { email } = validatedFields.data;  // extracting email from input field
    const exisitingUser = await getUserByEmail(email)    
        
    if(!exisitingUser) {
        return { error: 'We couldnt locate an account with that email. Confirm the email or register a new account.' }
    }
    
    const passwordResetToken = await generatePasswordResetToken(email)
    
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token, exisitingUser.name)
    
    if(exisitingUser) {
        return { 
            success: `We have sent an email with password reset instructions to ${email}` 
        }
    }
}