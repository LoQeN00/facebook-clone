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
      date
    }
  }
`;

export const PUBLISH_POST_MUTATION = gql`
  mutation ($id: ID!) {
    publishPost(where: { id: $id }, to: PUBLISHED) {
      id
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
