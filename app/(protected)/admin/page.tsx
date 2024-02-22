'use client';

import { UserRole } from '@prisma/client';

import { admin } from '@/actions/admin';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { RoleGate } from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AdminPage = () => {
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast({
          title: 'Forbidden Server Action',
          variant: 'destructive',
        });
      }

      if (data.success) {
        toast({
          title: 'Allowed Server Action',
          variant: 'success',
        });
      }
    });
  };

  const onApiRouteClick = () => {
    fetch('/api/admin').then((response) => {
      if (response.ok) {
        toast({
          title: 'Allowed API Route',
          variant: 'success',
        });
      } else {
        toast({
          title: 'Forbidden API Route',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin 🔑</p>
        <span className="text-sm font-medium text-center text-gray-500">
          Allows a user with <span className='font-bold text-black'>ADMIN</span> access to test access to certain routes.
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You have access to view this content." />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin Only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin Only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
