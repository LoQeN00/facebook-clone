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
