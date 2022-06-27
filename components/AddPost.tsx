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
  setNewlyAddedPosts: React.Dispatch<React.SetStateAction<Post[] | []>>;
};

export const AddPost = ({ setNewlyAddedPosts }: Props) => {
  const { userData, userLoading, userError } = useContext(UserContext) as UserContextValues;
  const [imageLoadingError, setImageLoadingError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [imageToPost, setImageToPost] = useState<Asset | null>(null);
  const [imageIsLoading, setImageIsLoading] = useState<boolean>(false);
  const [postSending, setPostSending] = useState<boolean>(false);
  const [createPostWithPhoto, { data: postDataWithPhoto }] = useMutation(CREATE_POST_MUTATION_WITH_PHOTO, {
    async onCompleted(data) {
      const publishedImage = await publishImageToPost({ variables: { id: imageToPost?.id } });
      await publishPost({ variables: { id: data.createPost.id } });
      removeImage();
      setPostSending(false);
      setInputValue('');
    },
  });

  const [createPostWithoutPhoto, { data: postDataWithoutPhoto }] = useMutation(CREATE_POST_MUTATION_WITHOUT_PHOTO, {
    async onCompleted(data) {
      await publishPost({ variables: { id: data.createPost.id } });
      setPostSending(false);
      setInputValue('');
    },
  });
  const [publishImageToPost] = useMutation(PUBLISH_ASSET_MUTATION);
  const [publishPost] = useMutation(PUBLISH_POST_MUTATION, {
    async onCompleted(data) {
      if (postDataWithPhoto) {
        setNewlyAddedPosts((prevState) => [postDataWithPhoto?.createPost, ...prevState]);
      } else if (postDataWithoutPhoto) {
        setNewlyAddedPosts((prevState) => [postDataWithoutPhoto?.createPost, ...prevState]);
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
      setImageIsLoading(true);
      try {
        const data: Asset = await addAsset(e.target.files[0]);
        setImageIsLoading(false);
        setImageToPost(data);
      } catch (e) {
        setImageLoadingError('Something went wrong..., try again');
      }
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
      {imageIsLoading && <div>Loading your asset ...</div>}
      {imageLoadingError && <div>{imageLoadingError}</div>}
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
      {inputValue ||
        (imageToPost && (
          <div className="w-full flex justify-center items-center">
            <button
              disabled={imageIsLoading || postSending}
              className="border-2 border-black py-2 px-4 rounded-3xl"
              onClick={() => createPost()}
            >
              Opublikuj
            </button>
          </div>
        ))}
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
