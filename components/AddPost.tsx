import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { UserContextValues } from '../types/context/user-context';
import Image from 'next/image';
import { Camera, ImageIcon, Emoji } from '../components/Icons';
import { useMutation } from '@apollo/client';
import { CREATE_POST_MUTATION, PUBLISH_POST_MUTATION } from '../graphql/mutations';
import { Post } from '../types/index';

type Props = {
  loadedPosts: React.MutableRefObject<[] | Post[]>;

  setPostsData: React.Dispatch<React.SetStateAction<Post[] | undefined>>;
  postsData: Post[] | undefined;
};

export const AddPost = ({ loadedPosts, setPostsData, postsData }: Props) => {
  const { userData, userLoading, userError } = useContext(UserContext) as UserContextValues;
  const [inputValue, setInputValue] = useState<string>('');
  const [publishPost] = useMutation(PUBLISH_POST_MUTATION, {
    async onCompleted(data) {
      if (loadedPosts.current.length > 0) {
        loadedPosts.current = [postData.createPost, ...loadedPosts.current];
        setPostsData((prevState) => [...prevState!.slice(0, 1)]);
        return;
      }

      if (postsData!.length > 0) {
        loadedPosts.current = [postData.createPost, ...loadedPosts.current];
        setPostsData((prevState) => [...prevState!.slice(0, 1)]);
        return;
      }
    },
  });
  const [createPost, { data: postData }] = useMutation(CREATE_POST_MUTATION, {
    async onCompleted(data) {
      await publishPost({ variables: { id: data.createPost.id } });
    },
  });

  return (
    <div className="bg-white shadow-xl w-full rounded-xl p-5 space-y-4">
      <div className="flex items-center space-x-4">
        {userLoading ? (
          <div className="w-[50px] h-[50px] bg-gray-200 rounded-full"></div>
        ) : (
          <Image className="rounded-full" src={userData?.userImage?.url} alt="facebook logo" width={50} height={50} />
        )}
        <input
          type="text"
          placeholder={`O czym myślisz, ${userData?.email}`}
          className="bg-gray-200 flex-1 p-3 rounded-3xl"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
      </div>
      {inputValue && (
        <div className="w-full flex justify-center items-center">
          <button
            className="border-2 border-black py-2 px-4 rounded-3xl"
            onClick={() => createPost({ variables: { title: inputValue, id: userData?.id } })}
          >
            Opublikuj
          </button>
        </div>
      )}

      <div className="h-[1px] bg-gray-200 w-full"></div>
      <div className="flex justify-evenly">
        <div className="flex space-x-3">
          <Camera />
          <p>Video Live</p>
        </div>
        <div className="flex space-x-3">
          <ImageIcon />
          <p>Image/Film</p>
        </div>
        <div className="flex space-x-3">
          <Emoji />
          <p>Mood/activity</p>
        </div>
      </div>
    </div>
  );
};
