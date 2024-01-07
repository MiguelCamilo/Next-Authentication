'use server'

import * as z from 'zod'
import { db } from '@/lib/db'
import { LoginSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if(!validatedFields.success) {
        return {
            error: 'Invalid fields',
        }
    }

    const { email, password } = validatedFields.data

    const user = await getUserByEmail(email)

    return { success: "Login succesful!" } 
}