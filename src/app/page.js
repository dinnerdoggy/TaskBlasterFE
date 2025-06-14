'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { useAuth } from '@/utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.displayName}! </h1>
      <img src="https://img.freepik.com/premium-vector/page-is-construction-sign-vector_24886-1377.jpg" alt="under construction" />
      <h5>Here, we will display progress dials for each task category, as well as a dial for overall completion of all categories</h5>
    </div>
  );
}

export default Home;
