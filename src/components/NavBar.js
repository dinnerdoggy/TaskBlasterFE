/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Offcanvas } from 'react-bootstrap';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { BiEdit, BiTrash } from 'react-icons/bi';
import PropTypes from 'prop-types';
import { usePathname } from 'next/navigation';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { deleteCategory, getCategories } from '../api/categoryData';

export default function SidebarNav() {
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const { user } = useAuth();
  const pathName = usePathname();

  const getAllTheCategories = () => {
    getCategories(user.uid).then(setCategories);
  };

  useEffect(() => {
    if (user?.uid) {
      getAllTheCategories();
    }
  }, [user, pathName]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = (cat) => {
    if (window.confirm(`Are you sure you want to delete the "${cat.title}" category?`)) {
      deleteCategory(cat.id, user.uid).then(() => {
        getAllTheCategories();
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
            {categories
              .filter((category) => category.title !== null)
              .map((category) => (
                <div key={category.id} className="d-flex justify-content-between align-items-center">
                  <Link href={`/category/${category.id}`} className="nav-link" onClick={handleClose}>
                    {category.title}
                  </Link>
                  <div className="d-flex gap-2">
                    <Link href={`/catFormPages/update/${category.id}`} className="nav-link editBtn" onClick={handleClose}>
                      <BiEdit className="addBtn" />
                    </Link>
                    <BiTrash className="addBtn deleteBtn" onClick={() => handleDelete(category)} style={{ textDecoration: 'none' }} />
                  </div>
                </div>
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
};
