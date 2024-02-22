'use server'

import * as z from 'zod'

import { db } from '@/lib/db'
import { currentUser } from '@/lib/auth'
import { getUserById } from '@/data/user'
import { SettingsSchema } from '@/schemas'

export const settingsUpdate = async (values: z.infer<typeof SettingsSchema>) => {
    const user = await currentUser()

    if(!user) {
        return { error: 'Unauthorized' }
    }

    const exisingUser = await getUserById(user.id)

    if(!exisingUser) return { error: 'Unauthorized' }

    await db.user.update({
        where: {
            id: exisingUser.id
        },
        data: {
            ...values,
        }
    })

    return { success: 'Settings Updated!' }
}