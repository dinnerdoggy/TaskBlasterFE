'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../utils/context/authContext';
import { createComment, updateComment } from '../../api/commentData';
import { getSingleDuty } from '../../api/dutyData';

const initialState = {
  content: '',
  dutyId: null,
};

function CommentForm({ obj = initialState }) {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dutyIdFromQuery = searchParams.get('dutyId');

  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (obj?.id) {
      setFormInput({
        content: obj.content || '',
        dutyId: obj.dutyId || null,
      });
    } else if (dutyIdFromQuery) {
      setFormInput((prev) => ({ ...prev, dutyId: Number(dutyIdFromQuery) }));
    }
  }, [obj, dutyIdFromQuery]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formInput,
      timeStamp: new Date().toISOString(),
    };

    const redirectAfter = async (dutyId) => {
      const dutyData = await getSingleDuty(dutyId, user.uid);
      if (dutyData?.categoryId) {
        router.push(`/category/${dutyData.categoryId}`);
      } else {
        router.push('/'); // fallback
      }
    };

    if (obj.id) {
      // Update mode
      updateComment({ ...payload, id: obj.id }, user.uid).then(() => {
        redirectAfter(obj.dutyId);
      });
    } else {
      // Create mode
      createComment(payload, user.uid).then(() => {
        redirectAfter(payload.dutyId);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-start mx-auto" style={{ maxWidth: '600px' }}>
      <h1 className="categoryTitle">{obj.id ? 'Edit Sticky Note' : 'Add a New Sticky Note'}</h1>

      <Form.Group className="taskCard">
        <Form.Label>Comment</Form.Label>
        <Form.Control as="textarea" rows={3} name="content" className="formField" value={formInput.content} onChange={handleChange} required placeholder="Write your comment here..." />
      </Form.Group>

      <Button className="eraserSubmit" type="submit">
        {obj.id ? 'Update' : 'Submit'}
      </Button>
    </Form>
  );
}

CommentForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    dutyId: PropTypes.number,
  }),
};

export default CommentForm;
