import { gql } from '@apollo/client';

export const CREATE_POST_MUTATION_WITH_PHOTO = gql`
  mutation ($id: ID!, $title: String!, $imageId: ID) {
    createPost(data: { title: $title, author: { connect: { id: $id } }, image: { connect: { id: $imageId } } }) {
      id
      title
      slug
      image {
        id
        url
        mimeType
      }
      author {
        id
        email
        userImage {
          url
        }
      }
      reactions {
        id
        type
        nextUser {
          id
          email
          userImage {
            url
          }
        }
      }
      date
    }
  }
`;

export const CREATE_POST_MUTATION_WITHOUT_PHOTO = gql`
  mutation ($id: ID!, $title: String!) {
    createPost(data: { title: $title, author: { connect: { id: $id } } }) {
      id
      title
      slug
      author {
        id
        email
        userImage {
          url
        }
      }
      reactions {
        id
        type
        nextUser {
          id
          email
          userImage {
            url
          }
        }
      }
      date
    }
  }
`;

export const ADD_REACTION_MUTATION = gql`
  mutation ($type: String!, $userId: ID!, $postId: ID!) {
    createReaction(data: { type: $type, nextUser: { connect: { id: $userId } }, post: { connect: { id: $postId } } }) {
      id
      type
    }
  }
`;

export const PUBLISH_REACTION_MUTATION = gql`
  mutation ($id: ID!) {
    publishReaction(where: { id: $id }, to: PUBLISHED) {
      id
      type
      nextUser {
        id
        email
        userImage {
          url
        }
      }
    }
  }
`;

export const DELETE_REACTION_MUTATION = gql`
  mutation ($reactionId: ID!) {
    deleteReaction(where: { id: $reactionId }) {
      id
      type
    }
  }
`;

export const PUBLISH_POST_MUTATION = gql`
  mutation ($id: ID!) {
    publishPost(where: { id: $id }, to: PUBLISHED) {
      id
      title
      slug
      author {
        id
        email
        userImage {
          url
        }
      }
      reactions {
        id
        type
        nextUser {
          id
          email
          userImage {
            url
          }
        }
      }
      date
    }
  }
`;

export const PUBLISH_ASSET_MUTATION = gql`
  mutation ($id: ID!) {
    publishAsset(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation ($id: ID!) {
    deletePost(where: { id: $id }) {
      id
    }
  }
`;

export const DELETE_ASSET_MUTATION = gql`
  mutation ($id: ID!) {
    deleteAsset(where: { id: $id }) {
      id
    }
  }
`;
