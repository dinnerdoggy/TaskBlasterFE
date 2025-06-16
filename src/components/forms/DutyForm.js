'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../utils/context/authContext';
import { getCategories } from '../../api/categoryData';
import { getResources } from '../../api/resourceData';
import { createDuty, updateDuty } from '../../api/dutyData';

const initialState = {
  title: '',
  description: '',
  priority: 'Low',
  categoryId: '',
  isCompleted: false,
  dueDate: '',
};

function DutyForm({ obj = initialState }) {
  const router = useRouter();
  const { user } = useAuth();

  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [resources, setResources] = useState([]);
  const [selectedResourceIds, setSelectedResourceIds] = useState([]);

  useEffect(() => {
    if (obj?.id) {
      setFormInput({
        title: obj.title || '',
        description: obj.description || '',
        priority: obj.priority || 'Low',
        categoryId: obj.categoryId?.toString() || '',
        isCompleted: obj.isCompleted || false,
        dueDate: obj.dueDate?.split('T')[0] || '',
      });
      setSelectedResourceIds(obj.resources?.map((res) => res.id) || []);
    }

    getCategories(user.uid).then(setCategories);
    getResources(user.uid).then(setResources);
  }, [obj, user.uid]);

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
      dueDate: formInput.dueDate ? new Date(formInput.dueDate).toISOString() : null,
      resources: selectedResourceIds.map((id) => ({ id })),
    };

    if (obj?.id) {
      // Update mode
      updateDuty({ ...payload, id: obj.id }, user.uid).then(() => router.push('/'));
    } else {
      // Create mode
      createDuty(payload, user.uid).then(() => router.push('/'));
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-start mx-auto" style={{ maxWidth: '600px' }}>
      <h1 className="text-center mb-4">{obj.id ? 'Update Task' : 'Create a New Task'}</h1>

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
        <Form.Label>Due Date</Form.Label>
        <Form.Control type="date" name="dueDate" value={formInput.dueDate} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Resources</Form.Label>
        {resources.map((res) => (
          <Form.Check key={res.id} type="checkbox" label={res.title} checked={selectedResourceIds.includes(res.id)} onChange={() => handleCheckbox(res.id)} />
        ))}
      </Form.Group>

      <Button variant="primary" type="submit">
        {obj.id ? 'Update Task' : 'Create Task'}
      </Button>
    </Form>
  );
}

DutyForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.string,
    categoryId: PropTypes.number,
    isCompleted: PropTypes.bool,
    resources: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  }),
};

export default DutyForm;
