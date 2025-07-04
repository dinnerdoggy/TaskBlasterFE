import React from 'react';
import { Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { signIn } from '../utils/auth';

function Signin() {
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
      <Image className="bigLogo" src="/images/TBLogo.png" />
      <Button type="button" size="lg" className="eraserCreate" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
