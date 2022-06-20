import React from 'react';
import Image from 'next/image';
import { Story } from '../components/Story';

type Props = {};

export const Stories = (props: Props) => {
  return (
    <div className="p-5 flex justify-center items-center space-x-1 sm:space-x-3 md:space-x-6  ">
      <Story src="/mateusz.jpg" user="Mateusz Kozłowski" />
      <Story src="/elon.jpg" user="Elon Musk" />
      <Story src="/bezos.jpg" user="Jeff Bezos" />
      <Story src="/bill.jpg" user="Bill Gates" />
      <Story src="/zuckerberg.jpg" user="Mark Zuckerberg" />
    </div>
  );
};
