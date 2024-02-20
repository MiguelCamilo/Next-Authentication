import { ExtendedUser } from '@/next-auth';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ToolTipParent } from '@/components/tool-tip';

interface UserInfoProps {
  user?: ExtendedUser; // extends the user role
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <ToolTipParent
            triggerText={user?.id || 'N/A'}
            contentText={'Copy ID'}
            className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md hover:cursor-pointer hover:bg-slate-300"
          />
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.role}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Two Factor Authentication</p>
          <span className="text-xs max-w-[180px] font-mono">
            {user?.isTwoFactorEnabled ? (
              <Badge variant={'success'}>ON</Badge>
            ) : (
              <Badge variant={'destructive'}>OFF</Badge>
            )}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

// this component will be an agnostic component that can be used in both the client and server
// depending on the parent component
