import React from 'react';
import { PlayButton, Flag, Friends, Cart, Home } from '../components/Icons';

type Props = {};

export const MiddleNavbarSection = (props: Props) => {
  return (
    <div className="justify-self-center self-center flex space-x-5">
      <Home className="md:w-8 md:h-8 lg:w-9 lg:h-9 hover:text-blue-600 transition-all ease-in" />
      <Flag className="md:w-8 md:h-8 lg:w-9 lg:h-9 hover:text-blue-600 transition-all ease-in" />
      <PlayButton className="md:w-8 md:h-8 lg:w-9 lg:h-9 hover:text-blue-600 transition-all ease-in" />
      <Cart className="md:w-8 md:h-8 lg:w-9 lg:h-9 hover:text-blue-600 transition-all ease-in" />
      <Friends className="md:w-8 md:h-8 lg:w-9 lg:h-9 hover:text-blue-600 transition-all ease-in" />
    </div>
  );
};
