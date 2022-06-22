import React, { useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { POSTS_DATA_QUERY } from '../graphql/queries';
import { Post } from '../types/index';

export const usePosts = (take: number, offset: number) => {
  const [postsData, setPostsData] = useState<Array<Post> | undefined>(undefined);

  const { data, error, loading, refetch } = useQuery<{ posts: Post[] }>(POSTS_DATA_QUERY, {
    variables: {
      take,
      offset,
    },
    onCompleted(data) {
      setPostsData((prevState) => {
        return [...data.posts];
      });
    },
  });

  return {
    postsData,
    error,
    loading,
    refetch,
    setPostsData,
  };
};
