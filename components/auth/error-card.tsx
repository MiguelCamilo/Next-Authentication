import { CardWrapper } from '@/components/auth/card-wrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

const ErrorCard = () => {
  
  return (
    <CardWrapper
      headerLabel="An error occured during authentication"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      backButtonVariant={"destructive"}
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive h-10 w-10" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
