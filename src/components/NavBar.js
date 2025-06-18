/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Offcanvas } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getCategories } from '../api/categoryData';

export default function SidebarNav() {
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const { user } = useAuth();

  const getAllTheCategories = () => {
    getCategories(user.uid).then(setCategories);
  };

  useEffect(() => {
    if (user?.uid) {
      getAllTheCategories();
    }
  }, [user]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <Button variant="dark" onClick={handleShow} className="eraserSubmit position-fixed top-0 start-0 m-3" style={{ zIndex: 1051 }}>
        ☰ Categories
      </Button>

      {/* Offcanvas Sidebar */}
      <Offcanvas show={show} onHide={handleClose} placement="start" backdrop={false} className="whiteBoard">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Task Blaster</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <nav className="d-flex flex-column gap-2">
            <Link href="/" className="nav-link" onClick={handleClose}>
              Front Page
            </Link>
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.id}`} className="nav-link" onClick={handleClose}>
                {category.title}
              </Link>
            ))}
            <button className="eraser" onClick={signOut}>
              Sign Out
            </button>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
