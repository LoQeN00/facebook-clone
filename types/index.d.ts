export interface Post {
  author: {
    email: string;
    userImage: {
      url: string;
    };
  };
  date: string;
  image: {
    url: string;
  };
  slug: string;
  title: string;
  id: string;
}
