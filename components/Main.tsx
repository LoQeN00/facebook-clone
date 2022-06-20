import React, { useContext } from 'react';
import { LeftMainSection } from '../components/LeftMainSection';
import { MiddleMainSection } from '../components/MiddleMainSection';

type Props = {};

export const Main = (props: Props) => {
  return (
    <div className="flex mt-[100px]">
      <LeftMainSection />
      <MiddleMainSection />
    </div>
  );
};
