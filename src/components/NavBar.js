/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Offcanvas } from 'react-bootstrap';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { BiEdit, BiTrash } from 'react-icons/bi';
import PropTypes from 'prop-types';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { deleteCategory, getCategories } from '../api/categoryData';

export default function SidebarNav({ onUpdate }) {
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
  const handleDelete = (cat) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(cat.id, user.uid).then(() => {
        onUpdate();
      });
    }
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <Button variant="dark" onClick={handleShow} className="eraserSubmit position-fixed top-0 start-0 m-3" style={{ zIndex: 1051 }}>
        ☰
      </Button>

      {/* Offcanvas Sidebar */}
      <Offcanvas show={show} onHide={handleClose} placement="start" backdrop={false} className="whiteBoard">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Task Blaster</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <nav className="fitBoard d-flex flex-column gap-1">
            <Link href="/" className="nav-link" onClick={handleClose}>
              Front Page
            </Link>
            <hr style={{ backgroundcolor: 'black', width: '80%' }} />
            <Link className="nav-link" href="/catFormPages/new">
              <BsFillPlusSquareFill className="addBtn" onClick={handleClose} />
            </Link>
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.id}`} className="nav-link" onClick={handleClose}>
                {category.title}
                <Link className="nav-link editBtn" href={`/catFormPages/update/${category.id}`}>
                  <BiEdit className="addBtn" onClick={handleClose} />
                </Link>
                <BiTrash className="addBtn deleteBtn" onClick={() => handleDelete(category)} />
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

SidebarNav.propTypes = {
  catObj: PropTypes.shape({
    id: PropTypes.number,
  }),
  onUpdate: PropTypes.func.isRequired,
};
