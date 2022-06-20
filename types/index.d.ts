export interface Post {
  author: {
    __typename: 'NextUser';
    email: string;
    userImage: {
      __typename: 'Asset';
      url: string;
    };
  };
  date: string;
  image: {
    __typename: 'Asset';
    url: string;
  };
  slug: string;
  title: string;
  id: string;
  __typename: 'Post';
}
