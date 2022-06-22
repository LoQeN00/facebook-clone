import React, { useContext, useState, useRef } from 'react';
import { UserContext } from '../context/UserContext';
import { UserContextValues } from '../types/context/user-context';
import Image from 'next/image';
import { Camera, ImageIcon, Emoji } from '../components/Icons';
import { useMutation } from '@apollo/client';
import {
  CREATE_POST_MUTATION_WITHOUT_PHOTO,
  PUBLISH_POST_MUTATION,
  PUBLISH_ASSET_MUTATION,
  CREATE_POST_MUTATION_WITH_PHOTO,
} from '../graphql/mutations';
import { Post, Asset } from '../types/index';
import { addAsset } from '../lib/addAsset';

type Props = {
  loadedPosts: React.MutableRefObject<[] | Post[]>;
  setPostsData: React.Dispatch<React.SetStateAction<Post[] | undefined>>;
  postsData: Post[] | undefined;
};

export const AddPost = ({ loadedPosts, setPostsData, postsData }: Props) => {
  const { userData, userLoading, userError } = useContext(UserContext) as UserContextValues;
  const [inputValue, setInputValue] = useState<string>('');
  const [imageToPost, setImageToPost] = useState<Asset | null>(null);
  const [createPostWithPhoto, { data: postDataWithPhoto }] = useMutation(CREATE_POST_MUTATION_WITH_PHOTO, {
    async onCompleted(data) {
      const publishedImage = await publishImageToPost({ variables: { id: imageToPost?.id } });
      await publishPost({ variables: { id: data.createPost.id } });
      removeImage();
      setInputValue('');
    },
  });

  const [createPostWithoutPhoto, { data: postDataWithoutPhoto }] = useMutation(CREATE_POST_MUTATION_WITHOUT_PHOTO, {
    async onCompleted(data) {
      await publishPost({ variables: { id: data.createPost.id } });
      setInputValue('');
    },
  });
  const [publishImageToPost] = useMutation(PUBLISH_ASSET_MUTATION);
  const [publishPost] = useMutation(PUBLISH_POST_MUTATION, {
    async onCompleted(data) {
      if (postDataWithPhoto) {
        if (loadedPosts.current.length > 0) {
          loadedPosts.current = [postDataWithPhoto?.createPost, ...loadedPosts.current];
          setPostsData((prevState) => [...prevState!.slice(0, 1)]);
          return;
        }

        if (postsData!.length > 0) {
          loadedPosts.current = [postDataWithPhoto?.createPost, ...loadedPosts.current];
          setPostsData((prevState) => [...prevState!.slice(0, 1)]);
          return;
        }
      } else if (postDataWithoutPhoto) {
        if (loadedPosts.current.length > 0) {
          loadedPosts.current = [postDataWithoutPhoto?.createPost, ...loadedPosts.current];
          setPostsData((prevState) => [...prevState!.slice(0, 1)]);
          return;
        }

        if (postsData!.length > 0) {
          loadedPosts.current = [postDataWithoutPhoto?.createPost, ...loadedPosts.current];
          setPostsData((prevState) => [...prevState!.slice(0, 1)]);
          return;
        }
      }
    },
  });

  const createPost = () => {
    if (imageToPost) {
      createPostWithPhoto({
        variables: { title: inputValue, id: userData?.id, imageId: imageToPost ? imageToPost?.id : null },
      });
      return;
    }

    createPostWithoutPhoto({ variables: { title: inputValue, id: userData?.id } });
  };

  const filePickerRef = useRef<HTMLInputElement | null>(null);

  const addImageToPost = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const data: Asset = await addAsset(e.target.files[0]);

      setImageToPost(data);
    }
  };

  const removeImage = () => {
    setImageToPost(null);
  };

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

      {imageToPost && (
        <div>
          {imageToPost.mimetype === 'video/mp4' ? (
            <video controls>
              <source src={imageToPost.url} type="video/mp4" />
            </video>
          ) : (
            <img src={imageToPost.url} alt="post image"></img>
          )}
        </div>
      )}
      {inputValue && (
        <div className="w-full flex justify-center items-center">
          <button className="border-2 border-black py-2 px-4 rounded-3xl" onClick={() => createPost()}>
            Opublikuj
          </button>
        </div>
      )}
      <div className="h-[1px] bg-gray-200 w-full"></div>
      <div className="flex justify-evenly">
        <div className="flex space-x-3 hover:bg-gray-200 px-4 py-2 rounded-2xl transition ease-in-out cursor-pointer">
          <Camera />
          <p>Video Live</p>
        </div>
        <div
          onClick={() => filePickerRef.current?.click()}
          className="flex space-x-3 hover:bg-gray-200 px-4 py-2 rounded-2xl transition ease-in-out cursor-pointer"
        >
          <ImageIcon />
          <p>Image/Film</p>
          <input type="file" onChange={addImageToPost} ref={filePickerRef} hidden />
        </div>
        <div className="flex space-x-3 hover:bg-gray-200 px-4 py-2 rounded-2xl transition ease-in-out cursor-pointer">
          <Emoji />
          <p>Mood/activity</p>
        </div>
      </div>
    </div>
  );
};
