'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Header } from '@/components/auth/header';
import Social from '@/components/auth/social';
import { BackButton } from '@/components/auth/back-button';
import { IconType } from 'react-icons';

interface CardWrapperProps {
  children: React.ReactNode;
  cardTitle?: string;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  backButtonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
  showSocial?: boolean;
  isBackButtonDisabled?: boolean;
  icon?: IconType;
  iconClassName?: string;
}

export const CardWrapper = ({
  children,
  cardTitle,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  backButtonVariant,
  showSocial,
  isBackButtonDisabled,
  icon,
  iconClassName
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} cardTitle={cardTitle} />
      </CardHeader>

      <CardContent>{children}</CardContent>

      {showSocial && (
        <CardFooter>
            <Social />
        </CardFooter>
      )}

      <CardFooter>
        <BackButton 
            href={backButtonHref}
            label={backButtonLabel}
            variant={backButtonVariant}
            icon={icon}
            iconClassName={iconClassName}
            disabled={isBackButtonDisabled}
        />
      </CardFooter>
    </Card>
  );
};
