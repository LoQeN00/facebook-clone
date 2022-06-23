import React, { useRef, useState, useEffect } from 'react';
import { Comment } from '../components/Icons/index';
import { Post } from '../types/index';
import { useSession } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import { ADD_REACTION_MUTATION, PUBLISH_REACTION_MUTATION, DELETE_REACTION_MUTATION } from '../graphql/mutations';

type Props = {
  post: Post;
};

export const Reactions = ({ post }: Props) => {
  const { data: session, status } = useSession();
  const [userReaction, setUserReaction] = useState(
    post.reactions.find((user) => user.nextUser.id === session?.user.userId)
  );
  const [youReacted, setYouReacted] = useState(userReaction ? true : false);

  const [reaction, setReaction] = useState(youReacted ? userReaction?.type : null);
  const [frozenCount, setFrozenCount] = useState(
    post.reactions.filter((reaction) => reaction.type === 'frozen').length
  );

  const [hotCount, setHotCount] = useState(post.reactions.filter((reaction) => reaction.type === 'hot').length);

  const [publishReaction] = useMutation(PUBLISH_REACTION_MUTATION, {
    onCompleted(data) {
      if (data.publishReaction.type === 'frozen') {
        setFrozenCount((prev) => prev + 1);
        setReaction('frozen');
      } else {
        setHotCount((prev) => prev + 1);
        setReaction('hot');
      }
      setUserReaction(data.publishReaction);
    },
  });
  const [addReaction] = useMutation(ADD_REACTION_MUTATION, {
    async onCompleted(data) {
      publishReaction({ variables: { id: data.createReaction.id } });
    },
  });
  const [deleteReaction] = useMutation(DELETE_REACTION_MUTATION, {
    onCompleted(data) {
      if (data.deleteReaction.type === 'frozen') {
        setFrozenCount((prev) => prev - 1);
      } else {
        setHotCount((prev) => prev - 1);
      }
    },
  });

  const checkReaction = (type: string) => {
    console.log(type);
    console.log(reaction);
    if (reaction === type) {
      deleteReaction({ variables: { reactionId: userReaction?.id } });
      setReaction(null);
      return;
    }
    if (reaction) {
      deleteReaction({ variables: { reactionId: userReaction?.id } });
    }

    addReaction({ variables: { type, userId: session?.user.userId, postId: post.id } });
  };

  return (
    <div className="w-full  flex justify-evenly items-center">
      <div className="cursor-pointer" onClick={() => checkReaction('frozen')}>
        <div className="text-3xl">
          <span className="text-2xl">{frozenCount > 0 && frozenCount}</span>{' '}
          <span className={`inline-block ${reaction === 'frozen' && 'bg-gray-200 p-2 rounded-xl'}`}>🥶</span>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => checkReaction('hot')}>
        <div className="text-3xl">
          <span className="text-2xl">{hotCount > 0 && hotCount}</span>{' '}
          <span className={`inline-block ${reaction === 'hot' && 'bg-gray-200 p-2 rounded-xl'}`}>🥵</span>
        </div>
      </div>
      <div>
        <Comment className="w-9 h-9" />
      </div>
    </div>
  );
};
