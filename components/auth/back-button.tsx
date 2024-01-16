'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BackButtonProps {
  href: string;
  label: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
}

export const BackButton = ({ href, label, variant }: BackButtonProps) => {
  return (
    <Button variant={variant || "link"} className="font-normal w-full" size={'sm'} asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
