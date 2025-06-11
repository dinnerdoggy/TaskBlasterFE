/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getCategories } from '../api/categoryData';

export default function NavBar() {
  const [categories, setCategories] = useState([]);

  const { user } = useAuth();

  const getAllTheCategories = () => {
    getCategories(user.uid).then(setCategories);
  };

  useEffect(() => {
    if (user?.uid) {
      getAllTheCategories();
    }
  }, [user]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/" className="navbar-brand">
          Task Blaster
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`} // assuming you're routing by ID
                className="nav-link"
              >
                {category.title}
              </Link>
            ))}
          </Nav>

          <Button variant="danger" onClick={signOut}>
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
