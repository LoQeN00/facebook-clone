import React, { createContext } from 'react';
import { UserContextValues } from '../types/context/user-context';
import { useQuery } from '@apollo/client';
import { USER_DATA_QUERY } from '../graphql/queries';
import { useSession } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextValues | null>(null);

export const UserContextProvider = ({ children }: Props) => {
  const { data: session, status } = useSession();

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(USER_DATA_QUERY, {
    variables: {
      id: session?.user?.userId,
    },
  });

  console.log();

  const value = {
    userData: userData?.nextUser,
    userLoading,
    userError,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
