import  { PrismaClient } from '@prisma/client'

// Using let instead of var would limit the scope of the prisma variable to 
// the current block or function, making it inaccessible outside of that scope. 
// Since the intention here is to make prisma globally accessible, var is used to achieve that.
declare global {
    // setting the type
    var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== 'production') globalThis.prisma = db;

// the reason for this file is due to next js hot reload which would 
// cause the prisma client to be created mulitple times in dev mode