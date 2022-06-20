import React from 'react';
import Image from 'next/image';

type Props = {};

export const LeftNavbarSection = (props: Props) => {
  return (
    <div className="justify-self-start flex justify-center items-center">
      <Image src="/fb_logo.png" alt="facebook logo" width={50} height={50} />
    </div>
  );
};
