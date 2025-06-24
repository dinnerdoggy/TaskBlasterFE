'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleComment } from '@/api/commentData';
import CommentForm from '@/components/forms/CommentForm';
import { useAuth } from '../../../../utils/context/authContext';

export default function UpdateCommentPage({ params }) {
  const [editItem, setEditItem] = useState(null);
  const { id } = params;
  const { user } = useAuth();

  useEffect(() => {
    getSingleComment(id, user.uid).then(setEditItem);
  }, [id, user.uid]);

  return editItem ? <CommentForm obj={editItem} /> : <div>Loading...</div>;
}

UpdateCommentPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
