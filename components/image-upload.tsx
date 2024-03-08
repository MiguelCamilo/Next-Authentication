'use client';

import * as React from 'react';
import Image from 'next/image';

import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression'

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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

  // const handleChange = React.useCallback(
  //   (base64: string) => {
  //     onChange(base64);
  //   },
  //   [onChange]
  // );

  const handleDrop = React.useCallback(
    async (files: any) => {
      const file = files[0];
      const options = {
        maxSizeMB: 1 / 1024,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: 0.8,
      }

      try {
        const compressedFile = await imageCompression(file, options)
        const reader = new FileReader()

        reader.onload = (event: any) => {
          const compressedBase64 = event.target.result;
          setBase64(compressedBase64);
          onChange(compressedBase64);
        }
        reader.readAsDataURL(compressedFile)

      } catch (error) {
        console.error(error)
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });

  const handleRemove = React.useCallback(
    (event: any) => {
      event.stopPropagation();
      setBase64('');
      onChange('');
    },
    [onChange]
  );

  return (
    // use shadcn to change the ui for the image upload
    <div
      {...getRootProps({
        className:
          'relative w-full p-4 text-white text-center border-2 border-dotted rounded-md border-gray-600 cursor-pointer hover:border-solid duration-150',
      })}
    >
      <AiOutlineClose
        className="absolute right-2 top-2 text-black hover:bg-neutral-200 rounded-full p-1"
        size={20}
        onClick={handleRemove}
      />
      <Input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height="100" width="100" alt="Uploaded Image" />
        </div>
      ) : (
        <span className="text-base text-black">{label}</span>
      )}
    </div>
  );
};

export default ImageUpload;
