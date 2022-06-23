import React, { useRef, useEffect, useState, useCallback } from 'react';
import { SinglePost } from './Post';
import { usePosts } from '../hooks/usePosts';
import { Post } from '../types/index';
import { AddPost } from '../components/AddPost';

type Props = {};

export const Posts = (props: Props) => {
  const [pagination, setPagination] = useState<{ take: number; offset: number }>({ take: 2, offset: 0 });
  const [contentIsLoading, setContentIsLoading] = useState(false);
  const { postsData, loading, setPostsData, refetch } = usePosts(pagination.take, pagination.offset);

  const lastPostElementRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadedPosts = useRef<Post[] | []>([]);

  const refetchData = useCallback(
    async (take: number, offset: number) => {
      const { data } = await refetch({ variables: { take, offset } });
      return data;
    },
    [refetch]
  );

  useEffect(() => {
    const main = async () => {
      if (loading) return;
      setContentIsLoading(false);
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(
        async (entries) => {
          if (entries[0].isIntersecting) {
            const data = await refetchData(pagination.take, pagination.offset);
            loadedPosts.current = [...loadedPosts.current, ...data.posts];

            setPagination((prevState) => {
              return {
                take: 2,
                offset: prevState.offset + 2,
              };
            });
            setContentIsLoading(true);
          }
        },
        { root: null, rootMargin: '50px', threshold: 1.0 }
      );

      if (lastPostElementRef.current) {
        observer.current.observe(lastPostElementRef.current);
      }
    };

    main();
  }, [loading, postsData, setPostsData, pagination.offset, pagination.take, refetchData]);

  return (
    <div className="w-[90%] max-w-3xl space-y-5 pb-36 md:pb-32">
      <AddPost loadedPosts={loadedPosts} setPostsData={setPostsData} postsData={postsData} />
      {loadedPosts.current.map((post) => {
        return <SinglePost post={post} key={post?.id} loadedPosts={loadedPosts} setPostsData={setPostsData} />;
      })}
      {loading
        ? null
        : postsData?.map((post: Post, index) => {
            if (index === postsData.length - 1) {
              return (
                <SinglePost
                  post={post}
                  key={post?.id}
                  ref={lastPostElementRef}
                  loadedPosts={loadedPosts}
                  setPostsData={setPostsData}
                />
              );
            }

            return <SinglePost post={post} key={post?.id} loadedPosts={loadedPosts} setPostsData={setPostsData} />;
          })}
      {contentIsLoading && <div>Loading ...</div>}
    </div>
  );
};
