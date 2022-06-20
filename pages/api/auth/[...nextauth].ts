import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { GraphQLClient, gql } from 'graphql-request';
import { hash, compare } from 'bcrypt';

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN!}`,
  },
});

const GetUserByEmail = gql`
  query GetUserByEmail($email: String!) {
    user: nextUser(where: { email: $email }, stage: DRAFT) {
      id
      password
    }
  }
`;

const CreateNextUserByEmail = gql`
  mutation CreateNextUserByEmail($email: String!, $password: String!) {
    newUser: createNextUser(
      data: { email: $email, password: $password, userImage: { connect: { id: "cl4e89s5o3ci80bur4k9llqzy" } } }
    ) {
      id
    }
  }
`;

const PublishNextUserById = gql`
  mutation ($id: ID) {
    publishNextUser(where: { id: $id }) {
      id
    }
  }
`;

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jamie@graphcms.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        const { email, password } = credentials;

        const { user } = await client.request(GetUserByEmail, {
          email,
        });

        if (!user) {
          const { newUser } = await client.request(CreateNextUserByEmail, {
            email,
            password: await hash(password, 12),
          });

          await client.request(PublishNextUserById, {
            id: newUser.id,
          });

          return {
            id: newUser.id,
            username: email,
            email,
          };
        }

        const isValid = await compare(password, user.password);

        if (!isValid) {
          throw new Error('Wrong credentials. Try again.');
        }

        return {
          id: user.id,
          username: email,
          email,
        };
      },
    }),
  ],
  secret: 'HCUHUAHDUHUODAHSOUIDSAJOUdjnod123213213!pijfdpioasjdiposajdp',
  callbacks: {
    async jwt({ token, account }) {
      return token;
    },

    async session({ session, token, user }) {
      if (token.sub) {
        session.user.userId = token.sub;
      }

      return session;
    },
  },
});
