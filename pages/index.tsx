import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { Navbar } from '../components/Navbar';
import { Main } from '../components/Main';

const Home = () => {
  const { data: session, status } = useSession();

  const loading = status === 'loading';

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Main />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
