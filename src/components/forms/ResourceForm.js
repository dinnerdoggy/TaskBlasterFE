'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../utils/context/authContext';
import { createResource, updateResource } from '../../api/resourceData';

const initialState = {
  title: '',
  description: '',
  type: '',
  url: '',
};

function ResourceForm({ obj = initialState }) {
  const { user } = useAuth();
  const router = useRouter();
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (obj?.id) {
      setFormInput({
        title: obj.title || '',
        description: obj.description || '',
        type: obj.type || '',
        url: obj.url || '',
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
      updateResource({ ...payload, id: obj.id }, user.uid).then(() => router.push('/resources'));
    } else {
      createResource(payload, user.uid).then(() => router.push('/resources'));
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-start mx-auto" style={{ maxWidth: '600px' }}>
      <h1 className="categoryTitle">{obj.id ? 'Edit Resource' : 'Create a New Resource'}</h1>

      <Form.Group className="taskCard">
        <Form.Label>Title</Form.Label>
        <Form.Control name="title" className="formField" value={formInput.title} onChange={handleChange} required placeholder="Enter resource title" />
      </Form.Group>

      <Form.Group className="taskCard">
        <Form.Label>Description</Form.Label>
        <Form.Control name="description" className="formField" as="textarea" rows={2} value={formInput.description} onChange={handleChange} placeholder="Enter resource description" />
      </Form.Group>

      <Form.Group className="taskCard">
        <Form.Label>Type</Form.Label>
        <Form.Control name="type" className="formField" value={formInput.type} onChange={handleChange} placeholder="e.g. Tool, Document, Link" />
      </Form.Group>

      <Form.Group className="taskCard">
        <Form.Label>URL (optional)</Form.Label>
        <Form.Control name="url" className="formField" type="url" value={formInput.url} onChange={handleChange} placeholder="https://example.com" />
      </Form.Group>

      <Button className="eraserSubmit" type="submit">
        {obj.id ? 'Edit' : 'Submit'}
      </Button>
    </Form>
  );
}

ResourceForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default ResourceForm;
