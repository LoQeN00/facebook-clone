import React, { useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { POSTS_DATA_QUERY } from '../graphql/queries';
import { Post } from '../types/index';

export const usePosts = (take: number, offset: number) => {
  const [postsData, setPostsData] = useState<Post[] | []>([]);

  const { data, error, loading, refetch, fetchMore } = useQuery<{ posts: Post[] }>(POSTS_DATA_QUERY, {
    variables: {
      take,
      offset,
    },
    onCompleted(data) {
      setPostsData((prevState) => {
        return [...prevState!, ...data.posts];
      });
    },
  });

  return {
    postsData,
    error,
    loading,
    refetch,
    setPostsData,
    fetchMore,
  };
};
