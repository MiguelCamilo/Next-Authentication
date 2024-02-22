'use client'

import { UserRole } from '@prisma/client';

import { useCurrentRole } from '@/hooks/use-current-role';
import { FormError } from '@/components/form-error';

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole;
}

/**
 * Gatekeeper for rendering certain content based on the user's role. 
 * It ensures that only users with a specific role are allowed to view the content wrapped within it.
 * @param allowedRole
 * @returns 
 */
export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
    const role = useCurrentRole();

    if (role !== allowedRole) {
        return (
            <FormError message='You do not have access to view this content.' />
        )
    }

    return (
        <>{children}</>
    )
}