'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleCategory } from '@/api/categoryData';
import CategoryForm from '@/components/forms/CategoryForm';
import { useAuth } from '../../../../utils/context/authContext';

export default function UpdateCategoryPage({ params }) {
  const [editItem, setEditItem] = useState(null);
  const { id } = params;
  const { user } = useAuth();

  useEffect(() => {
    getSingleCategory(id, user.uid).then(setEditItem);
  }, [id, user.uid]);

  return editItem ? <CategoryForm obj={editItem} /> : <div>Loading...</div>;
}

UpdateCategoryPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
