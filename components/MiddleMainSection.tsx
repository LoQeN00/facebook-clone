import React from 'react';
import { Stories } from './Stories';
import { Posts } from './Posts';
type Props = {};

export const MiddleMainSection = (props: Props) => {
  return (
    <div className="w-[80%] lg:w-[65%] flex flex-col items-center space-y-6 overflow-y-scroll scrollbar-hide max-h-screen">
      <Stories />
      <Posts />
    </div>
  );
};
