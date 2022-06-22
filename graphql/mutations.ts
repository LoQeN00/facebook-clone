import { gql } from '@apollo/client';

export const CREATE_POST_MUTATION = gql`
  mutation ($id: ID!, $title: String!) {
    createPost(data: { title: $title, author: { connect: { id: $id } } }) {
      id
      title
      slug
      image {
        url
      }
      author {
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
