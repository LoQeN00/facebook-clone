import React from 'react';
import { Post } from '../types/index';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import { DELETE_POST_MUTATION, DELETE_ASSET_MUTATION } from '../graphql/mutations';
import { Reactions } from '../components/Reactions';

type Props = {
  post: Post;
  setPostsData?: React.Dispatch<React.SetStateAction<Post[] | []>>;
  setNewlyAddedPosts?: React.Dispatch<React.SetStateAction<Post[] | []>>;
  type: 'new' | 'loaded';
};

export const SinglePost = React.forwardRef<HTMLDivElement, Props>(
  ({ post, setPostsData, type, setNewlyAddedPosts }: Props, ref) => {
    const { data: session, status } = useSession();

    const [deleteAsset] = useMutation(DELETE_ASSET_MUTATION);
    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
      async onCompleted() {
        if (post.image?.url) {
          await deleteAsset({ variables: { id: post.image.id } });
        }

        if (type === 'new') {
          setNewlyAddedPosts!((prevState) => [...prevState!?.filter((postData) => post.id !== postData.id)]);
        } else {
          setPostsData!((prevState) => [...prevState!?.filter((postData) => post.id !== postData.id)]);
        }
      },
    });

    return (
      <div className="bg-white shadow-xl w-full rounded-xl p-5 space-y-4" ref={ref}>
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center space-x-3">
            {post?.author?.userImage?.url ? (
              <Image
                src={post?.author?.userImage?.url}
                width={30}
                height={30}
                className="rounded-full object-cover"
                alt={post.title}
              />
            ) : (
              <div className="w-[30px] h-[30px] bg-gray-200"></div>
            )}
            <p>{post?.author?.email}</p>
          </div>
          {post.author.id === session?.user.userId && (
            <button onClick={() => deletePost({ variables: { id: post.id } })}>Usuń post</button>
          )}
        </div>
        <p className="text-md font-bold">{post?.title}</p>
        {post?.image?.url && (
          <div className="relative w-full h-[400px]">
            {post.image.mimeType === 'video/mp4' ? (
              <video controls className="w-full h-full">
                <source src={post.image.url} type="video/mp4" />
              </video>
            ) : (
              <Image src={post?.image?.url} layout="fill" alt={post?.title} className="object-contain" />
            )}
          </div>
        )}
        {/* <Reactions post={post} /> */}
      </div>
    );
  }
);
