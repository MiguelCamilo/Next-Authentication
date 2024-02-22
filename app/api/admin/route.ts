import { NextResponse } from 'next/server';

import { UserRole } from '@prisma/client';

import { currentRole } from '@/lib/auth';

/**
 * This is an example of a protected API route that only allows 
 * users with the role of 'ADMIN' to access it.
 * With an API Route we will return a NextResponse object
 * instead of using return error
 * @returns 
 */
export async function GET() {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(null, { status: 403 });
}
