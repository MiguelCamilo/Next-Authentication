'use client';

import * as React from 'react'

import { useSession } from 'next-auth/react';

import { settingsUpdate } from '@/actions/settings-update';

import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardHeader,CardContent } from '@/components/ui/card';


const Settings = () => {
  const [isPending, startTransition] = React.useTransition();

  const { update } = useSession() // allows up the session after user updates settings

  const onSettingsUpdate = () => {
    startTransition(() => {
      settingsUpdate({
        name: 'Test Name'
      })
      .then(() => {
        update();
      })
    })
  }

  return (
    <Card className="max-w-[600px]">
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>
          Settings ⚙️
        </p>
      </CardHeader>

      <CardContent>
        <Button 
          onClick={onSettingsUpdate}
          disabled={isPending}
        >          
          Updated Name
        </Button>
      </CardContent>
    </Card>
  );
};

export default Settings;
