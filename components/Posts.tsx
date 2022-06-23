import React, { useRef, useEffect, useState } from 'react';
import { SinglePost } from './Post';
import { usePosts } from '../hooks/usePosts';
import { Post } from '../types/index';
import { AddPost } from '../components/AddPost';

type Props = {};

export const Posts = (props: Props) => {
  const [pagination, setPagination] = useState<{ take: number; offset: number }>({ take: 2, offset: 0 });
  const [contentIsLoading, setContentIsLoading] = useState(false);
  const { postsData, loading, setPostsData } = usePosts(pagination.take, pagination.offset);

  const lastPostElementRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadedPosts = useRef<Post[] | []>([]);

  useEffect(() => {
    if (loading) return;
    setContentIsLoading(false);
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadedPosts.current = [...loadedPosts.current, ...postsData!];
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
  }, [loading, postsData, setPostsData]);

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
