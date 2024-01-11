'use server'

// install bcryptjs and @types/bcryptjs if
// standard bcrypt is giving errors
import bcryptjs from 'bcryptjs'
import * as z from 'zod'

import { db } from '@/lib/db'
import { RegisterSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if(!validatedFields.success) {
        return {
            error: 'Invalid fields',
        }
    }
    
    const { name, email, password } = validatedFields.data

    const hashedPassword = await bcryptjs.hash(password, 10)

    // confirm if email is not taken
    const exisitingUser = await getUserByEmail(email)

    if(exisitingUser) return { error: "Email already in use!" }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    })

    //TODO: send verification token email

    return { success: "Account created succesfully!" }
}