export interface Post {
  author: {
    email: string;
    id: string;
    userImage: {
      url: string;
    };
  };
  date: string;
  image: {
    id: string;
    url: string;
    mimeType: string;
  };
  slug: string;
  title: string;
  id: string;
}

export interface Asset {
  filename: string;
  height: number;
  id: string;
  mimetype: string;
  size: number;
  url: string;
  width: number;
}
