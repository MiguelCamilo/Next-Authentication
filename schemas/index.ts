import * as z from 'zod';

import { UserRole } from '@prisma/client';

export const SettingsSchema = z.object({
    name: z.optional(z.string().min(3, {
        message: 'Name requires a minimum of 3 characters.'
    })),
    profileImage: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6))

    // .refind is a zod method that allows you to add custom validation
}).refine((data) => { 
    // if user makes a change to their password, 
    // they must also provide a new password
    if(data.password && !data.newPassword) {
        return false;
    }

    if(data.newPassword && !data.password) {
        return false;
    }

    return true;
}, {
    message: 'Both fields required when changing password.',
    path: ['newPassword']
})


export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    password: z.string().min(1, {
        message: "Please enter your password."
    }),
    // example on how to make param optional
    code: z.optional(z.string().min(6))
})

export const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: "Name requires a minimum of 1 character."
    }),
    email: z.string().email({
        message: 'Please enter a valid email address.',     
    }),
    password: z.string().min(6, {
        message: "Password requires a minimum of 6 characters."
    }),
})

export const ResetSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address.',        
    }),
})

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Password requires a minimum of 6 characters."
    }),
    confirmedPassword: z.string().min(6)
})

/**
 * Represents the login form schema using Zod form validation.
 * Zod is a TypeScript-first schema validation library that allows you to define
 * the shape and constraints of your data using a simple and expressive API.
 * In this case, the LoginSchema defines the shape of the login form data,
 * specifying that it should have an email and password field, both of type string.
 */