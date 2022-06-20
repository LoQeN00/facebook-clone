import React from 'react';
import { Post } from '../types/index';
import Image from 'next/image';

type Props = {
  post: Post;
};

export const SinglePost = React.forwardRef<HTMLDivElement, Props>(({ post }: Props, ref) => {
  return (
    <div className="bg-white shadow-xl w-full rounded-xl p-5 space-y-4" ref={ref}>
      <div className="flex justify-start items-center space-x-3">
        {post.author.userImage.url ? (
          <Image
            src={post.author?.userImage?.url}
            width={30}
            height={30}
            className="rounded-full object-cover"
            alt={post.title}
          />
        ) : (
          <div className="w-[30px] h-[30px] bg-gray-200"></div>
        )}

        <p>{post.author.email}</p>
      </div>
      <p className="text-md font-bold">{post.title}</p>
      <div className="relative w-full h-[300px]">
        <Image src={post.image?.url} layout="fill" alt={post.title} className="object-cover" />
      </div>
    </div>
  );
});
