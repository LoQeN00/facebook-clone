import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { UserContextValues } from '../types/context/user-context';
import Image from 'next/image';
import { Friends, ShoppingBag, Clock, Calendar, Computer, ChevronDown } from '../components/Icons';

type Props = {};

export const LeftMainSection = (props: Props) => {
  const { userData, userError, userLoading } = useContext(UserContext) as UserContextValues;

  return (
    <div className="p-4 mt-5 flex flex-col  items-start space-y-9  w-[20%] ">
      <div className="flex space-x-2 items-center">
        <Friends className="text-blue-500 h-7 w-7" />
        <span className="hidden font-normal md:inline">Friends</span>
      </div>
      <div className="flex space-x-2 items-center">
        <ShoppingBag className="text-blue-500 h-7 w-7" />
        <span className="hidden font-normal md:inline">Marketplace</span>
      </div>
      <div className="flex space-x-2 items-center">
        <Clock className="text-blue-500 h-7 w-7" />
        <span className="hidden font-normal md:inline">Memories</span>
      </div>
      <div className="flex space-x-2 items-center">
        <Calendar className="text-blue-500 h-7 w-7" />
        <span className="hidden font-normal md:inline">Events</span>
      </div>
      <div className="flex space-x-2 items-center">
        <Computer className="text-blue-500 h-7 w-7" />
        <span className="hidden font-normal md:inline">Watch</span>
      </div>
      <div className="flex space-x-2 items-center">
        <ChevronDown className="text-blue-500 h-7 w-7" />
        <span className="hidden font-normal md:inline">See more</span>
      </div>
    </div>
  );
};
