import React from 'react';
import Image from 'next/image';

import { LeftNavbarSection } from '../components/LeftNavbarSection';
import { MiddleNavbarSection } from '../components/MiddleNavbarSection';
import { RightNavbarSection } from '../components/RightNavbarSection';

type Props = {};

export const Navbar = (props: Props) => {
  return (
    <div className="p-3 grid grid-cols-[1fr_2fr_1fr] w-full mx-auto bg-white shadow-md fixed z-20">
      <LeftNavbarSection />
      <MiddleNavbarSection />
      <RightNavbarSection />
    </div>
  );
};
