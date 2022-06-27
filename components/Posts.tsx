import React, { useRef, useEffect, useState, useCallback } from 'react';
import { SinglePost } from './Post';
import { usePosts } from '../hooks/usePosts';
import { Post } from '../types/index';
import { AddPost } from '../components/AddPost';

type Props = {};

export const Posts = (props: Props) => {
  const [pagination, setPagination] = useState<{ take: number; offset: number }>({ take: 2, offset: 0 });
  const { postsData, loading, setPostsData, fetchMore } = usePosts(pagination.take, pagination.offset);
  const [newlyAddedPosts, setNewlyAddedPosts] = useState<Post[] | []>([]);

  const lastPostElementRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (loading) return;
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          setPagination((prevState) => {
            return {
              take: 2,
              offset: prevState.offset + 2,
            };
          });
        }
      },
      { root: null, rootMargin: '50px', threshold: 1.0 }
    );

    if (lastPostElementRef.current) {
      observer.current.observe(lastPostElementRef.current);
    }
  }, [loading, postsData, setPostsData]);

  useEffect(() => {
    if (pagination.offset === 0) return;
    fetchMore({ variables: { take: pagination.take, offset: pagination.offset + newlyAddedPosts.length } });
  }, [pagination, fetchMore, newlyAddedPosts]);

  return (
    <div className="w-[90%] max-w-3xl space-y-5 pb-36 md:pb-32">
      <AddPost setNewlyAddedPosts={setNewlyAddedPosts} />
      {newlyAddedPosts.map((post) => {
        return <SinglePost type="new" setNewlyAddedPosts={setNewlyAddedPosts} post={post} key={post?.id} />;
      })}
      {loading
        ? null
        : postsData?.map((post: Post, index) => {
            if (index === postsData.length - 1) {
              return (
                <SinglePost
                  type="loaded"
                  setPostsData={setPostsData}
                  post={post}
                  key={post?.id}
                  ref={lastPostElementRef}
                />
              );
            }

            return <SinglePost type="loaded" setPostsData={setPostsData} post={post} key={post?.id} />;
          })}
    </div>
  );
};
