'use client';

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../utils/context/authContext';
import { getCategories } from '../../api/categoryData';
import { getResources } from '../../api/resourceData';
import { createDuty } from '../../api/dutyData';

function DutyForm() {
  const router = useRouter();
  const { user } = useAuth();

  const [formInput, setFormInput] = useState({
    title: '',
    description: '',
    priority: 'Low',
    categoryId: '',
    isCompleted: false,
  });

  const [categories, setCategories] = useState([]);
  const [resources, setResources] = useState([]);
  const [selectedResourceIds, setSelectedResourceIds] = useState([]);

  useEffect(() => {
    getCategories(user.uid).then(setCategories);
    getResources(user.uid).then(setResources);
  }, [user.uid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (id) => {
    setSelectedResourceIds((prev) => (prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      categoryId: Number(formInput.categoryId),
      uid: user.uid,
      resources: selectedResourceIds.map((id) => ({ id })),
    };

    createDuty(payload, user.uid).then(() => router.push('/duties'));
  };

  return (
    <Form onSubmit={handleSubmit} className="text-start mx-auto" style={{ maxWidth: '600px' }}>
      <h1 className="text-center mb-4">Create a New Task</h1>

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control name="title" value={formInput.title} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control name="description" as="textarea" rows={3} value={formInput.description} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Priority</Form.Label>
        <Form.Select name="priority" value={formInput.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Normal">Medium</option>
          <option value="High">High</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select name="categoryId" value={formInput.categoryId} onChange={handleChange} required>
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Resources</Form.Label>
        {resources.map((res) => (
          <Form.Check key={res.id} type="checkbox" label={res.name} checked={selectedResourceIds.includes(res.id)} onChange={() => handleCheckbox(res.id)} />
        ))}
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Duty
      </Button>
    </Form>
  );
}

DutyForm.propTypes = {
  // optional props if refactored to support edit mode later
};

export default DutyForm;
