import React from 'react';
import Image from 'next/image';

type Props = {
  src: string;
  user: string;
};

export const Story = ({ src, user }: Props) => {
  return (
    <div className="relative w-12 h-12 lg:w-[110px] lg:h-[175px] overflow-hidden group lg:rounded-2xl">
      <Image
        className="rounded-full lg:rounded-2xl object-cover lg:brightness-75 z-0 transition group-hover:scale-110 group-hover:animate-pulse"
        src={src}
        layout="fill"
        alt="mateusz kozłowski story"
      />

      <div className="absolute w-full h-full top-0 left-0 text-white text-xs  justify-center items-end p-4 truncate hidden lg:flex">
        <p className="truncate font-bold">{user}</p>
      </div>
    </div>
  );
};
