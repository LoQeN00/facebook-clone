import { GraphQLClient, gql } from 'graphql-request';

export const client = new GraphQLClient(`${process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!}/upload`, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN!}`,
  },
});
