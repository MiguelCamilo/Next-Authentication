import * as z from 'zod';
import { UseFormReturn } from 'react-hook-form';

import { LoginSchema } from '@/schemas';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';

interface TwoFactorCodeProps {
  form: UseFormReturn<{
    code?: string | undefined;
    email: string;
    password: string;
  }>;
  success: string | undefined;
  error: string | undefined;
  isPending?: boolean;
  handleLoginSubmit: (values: z.infer<typeof LoginSchema>) => void;
}

export const TwoFactorCodeForm = ({ form, success, error, isPending, handleLoginSubmit }: TwoFactorCodeProps) => {
  return (
    <CardWrapper
      cardTitle='Two Factor Authentication'
      headerLabel="Enter 2FA Code that was sent to your email."
      headerLabelClassName="text-muted-foreground text-xs text-center"
      backButtonLabel="Back to Register"
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLoginSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
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
                      className="text-center"
                      type="tel"
                    />
                  </FormControl>
                  {/* to change the default FormMessage go into the LoginSchema */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Confirm                  
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
