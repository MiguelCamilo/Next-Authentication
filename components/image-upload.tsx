'use client';

import * as React from 'react';
import Image from 'next/image';

import { useDropzone } from 'react-dropzone';

import { Input } from '@/components/ui/input';

import { AiOutlineClose } from 'react-icons/ai';

interface ImageUploadsInteface {
  value?: string;
  disabled?: boolean;
  label: string;
  onChange: (base64: string) => void;
}

const ImageUpload = ({
  value,
  disabled,
  label,
  onChange,
}: ImageUploadsInteface) => {
  const [base64, setBase64] = React.useState(value);

  const handleChange = React.useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = React.useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        setBase64(event.target.value);
        handleChange(event.target.value);
      };
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      'image/jpege': [],
      'image/png': [],
    },
  });

  const handleRemove = React.useCallback(
    (event: any) => {
      event.stopPropagation();
      setBase64('');
      handleChange('');
    },
    [handleChange]
  );

  return (
    <div
      {...getRootProps({
        className:
          'relative w-full p-4 text-white text-center border-2 border-dotted rounded-md border-gray-600 cursor-pointer hover:border-solid duration-150',
      })}
    >
      <Input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height="100" width="100" alt="Uploaded Image" />
        </div>
      ) : (
        <p className="text-white">{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;
