'use client';

import { useAuth } from '@/utils/context/authContext';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

function Home() {
  const { user } = useAuth();
  const router = useRouter();

  const goToCreate = () => {
    router.push('/category/new');
  };

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
      <h1 className="categoryTitle">Hello {user.displayName}! </h1>
      <Button className="eraserCreate" onClick={goToCreate}>
        Add a Task
      </Button>
      <img src="https://img.freepik.com/premium-vector/page-is-construction-sign-vector_24886-1377.jpg" alt="under construction" />
      <h5>Here, we will display progress dials for each task category, as well as a dial for overall completion of all categories</h5>
    </div>
  );
}

export default Home;
