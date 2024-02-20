'use client';

import { useToast } from '@/components/ui/use-toast';

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

interface ToolTipProps {
  triggerText: string;
  contentText: string;
  className?: string;
}

export const ToolTipParent = ({
  triggerText,
  contentText,
  className,
}: ToolTipProps) => {
  const { toast } = useToast();
  return (
    <TooltipProvider delayDuration={250}>
      <Tooltip>
        <TooltipTrigger
          onClick={() => {
            toast({
              title: 'Text Copied to clipboard! 📋',              
              variant: 'default',
            });
            navigator.clipboard.writeText(triggerText);
          }}
          className={className}
        >
          {triggerText}
        </TooltipTrigger>
        <TooltipContent>{contentText}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
