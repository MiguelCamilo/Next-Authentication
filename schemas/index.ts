import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address.',        
    }),
    password: z.string().min(1, {
        message: "Please enter your password."
    }),
})


export const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: "Name requieres a minimum of 1 character."
    }),
    email: z.string().email({
        message: 'Please enter a valid email address.',     
    }),
    password: z.string().min(6, {
        message: "Password requieres a minimum of 6 characters."
    }),
})

/**
 * Represents the login form schema using Zod form validation.
 * Zod is a TypeScript-first schema validation library that allows you to define
 * the shape and constraints of your data using a simple and expressive API.
 * In this case, the LoginSchema defines the shape of the login form data,
 * specifying that it should have an email and password field, both of type string.
 */