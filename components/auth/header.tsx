import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

interface HeaderProps {
  cardTitle?: string;
  label: string;
  labelClassName?: string;
}

export const Header = ({ label, cardTitle, labelClassName }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn('text-3xl font-semibold')}>
        {cardTitle || "Next Auth 🔐"}
      </h1>
      <p className={labelClassName}>{label}</p>
    </div>
  );
};
