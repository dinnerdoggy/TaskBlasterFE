'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../utils/context/authContext';
import { createCategory, updateCategory } from '../../api/categoryData';

const initialState = {
  title: '',
};

function CategoryForm({ obj = initialState }) {
  const { user } = useAuth();
  const router = useRouter();
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (obj?.id) {
      setFormInput({
        title: obj.title || '',
      });
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formInput,
      uid: user.uid,
    };

    if (obj.id) {
      // Update mode
      updateCategory({ ...payload, id: obj.id }).then(() => router.push('/'));
    } else {
      // Create mode
      createCategory(payload).then(() => router.push('/'));
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-start mx-auto" style={{ maxWidth: '600px' }}>
      <h1 className="categoryTitle">{obj.id ? 'Update Category' : 'Create a New Category'}</h1>

      <Form.Group className="taskCard">
        <Form.Label>Title</Form.Label>
        <Form.Control name="title" className="formField" value={formInput.title} onChange={handleChange} required placeholder="Enter category title" />
      </Form.Group>

      <Button className="eraserSubmit" type="submit">
        {obj.id ? 'Update Category' : 'Create Category'}
      </Button>
    </Form>
  );
}

CategoryForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
};

export default CategoryForm;
