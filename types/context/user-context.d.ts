import { ApolloError } from '@apollo/client';
export interface UserContextValues {
  userData: {
    id: string;
    email: string;
    userImage: {
      url: string;
    };
  };
  userError: ApolloError | undefined;

  userLoading: boolean;
}
