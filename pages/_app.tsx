import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apolloclient';
import { UserContextProvider } from '../context/UserContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <UserContextProvider>
          <Component {...pageProps} />
        </UserContextProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
