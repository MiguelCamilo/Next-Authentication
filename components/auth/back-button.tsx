'use client';

import Link from 'next/link';
import { IconType } from 'react-icons';

import { Button } from '@/components/ui/button';

interface BackButtonProps {
  icon?: IconType;
  iconClassName?: string;
  href: string;
  label: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined;
}

export const BackButton = ({
  href,
  label,
  variant,
  icon: BackButton,
  iconClassName,
}: BackButtonProps) => {
  return (
    <div className='w-full'>
      <Link href={href}>
        <Button
          variant={variant || 'link'}
          className="font-normal w-full"
          size={'sm'}
          asChild
        >
          <div>
            {BackButton && <BackButton className={iconClassName} />}
            {label}
          </div>
        </Button>
      </Link>
    </div>
  );
};
