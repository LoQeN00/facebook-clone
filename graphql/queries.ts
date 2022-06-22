import { gql } from '@apollo/client';

export const USER_DATA_QUERY = gql`
  query ($id: ID) {
    nextUser(where: { id: $id }) {
      id
      email
      userImage {
        url
      }
    }
  }
`;

export const POSTS_DATA_QUERY = gql`
  query ($take: Int, $offset: Int) {
    posts(first: $take, skip: $offset, orderBy: createdAt_DESC) {
      id
      title
      slug
      image {
        url
        mimeType
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
