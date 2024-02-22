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
}