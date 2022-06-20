import React, { useContext } from 'react';
import Image from 'next/image';
import { UserContext } from '../context/UserContext';
import { UserContextValues } from '../types/context/user-context';
import { Bell, ChevronDown, Chat } from '../components/Icons';

type Props = {};

export const RightNavbarSection = (props: Props) => {
  const { userData, userError, userLoading } = useContext(UserContext) as UserContextValues;

  return (
    <div className="justify-self-end">
      {userLoading ? (
        <div className="w-[50px] h-[50px] bg-gray-200 rounded-full"></div>
      ) : (
        <div className="flex justify-center items-center space-x-3">
          <Image className="rounded-full" src={userData?.userImage?.url} alt="facebook logo" width={50} height={50} />
          <span className="hidden md:block ">{userData?.email}</span>

          <div className="hidden xl:block xl:w-[25px] xl:h-[25px] xl:rounded-full xl:bg-gray-300 xl:p-4 2xl:p-5 relative">
            <Chat className="absolute translate-x-[-50%] translate-y-[-50%] " />
          </div>

          <div className="hidden xl:block xl:w-[25px] xl:h-[25px] xl:rounded-full xl:bg-gray-300 xl:p-4 2xl:p-5 relative">
            <Bell className="absolute translate-x-[-50%] translate-y-[-50%] " />
          </div>

          <div className="hidden xl:block xl:w-[25px] xl:h-[25px] xl:rounded-full xl:bg-gray-300 xl:p-4 2xl:p-5 relative">
            <ChevronDown className="absolute translate-x-[-50%] translate-y-[-50%] " />
          </div>
        </div>
      )}
    </div>
  );
};
