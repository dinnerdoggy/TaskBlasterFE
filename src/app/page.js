'use client';

import { useAuth } from '@/utils/context/authContext';
import { Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
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
      <h5 className="categoryTitle">Hello {user.displayName}! </h5>
      <Image src="/images/TBLogo.png" />
      <hr />
      <Button className="eraserCreate" onClick={goToCreate}>
        Add a Task
      </Button>
    </div>
  );
}

export default Home;
