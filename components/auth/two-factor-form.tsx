import * as z from 'zod'
import { UseFormReturn } from 'react-hook-form';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface TwoFactorCodeProps {
    form: UseFormReturn<{ code?: string | undefined, email: string, password: string }>
    isPending?: boolean;
}

export const TwoFactorCodeForm = ({ form, isPending } : TwoFactorCodeProps) => {
  return (
    <>
     <div className='space-y-4'>
        <FormField
        control={form.control}
        name="code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Two Factor Authentication Code</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || ''}
                disabled={isPending}
                placeholder="*  *  *  *  *  *"     
                className='text-center'    
                type='tel'
              />
            </FormControl>
            {/* to change the default FormMessage go into the LoginSchema */}
            <FormMessage />
          </FormItem>
        )}
      />
     </div>
     </>
  );
};
