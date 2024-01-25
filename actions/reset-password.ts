'use serve'

import * as z from 'zod'

import { ResetSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values)

    if(!validatedFields.success) {
        return { error: 'Invalid email.' }
    }

    const { email } = validatedFields.data // extracting email from input field
    const exisitingUser = await getUserByEmail(email)

    if(!exisitingUser) {
        return { error: 'Email not found.' }
    }

    // TODO: generate token first, have user verify said token then send reset password email

    return { success: `We have sent an email with password reset instructions to ${email}.` }
}