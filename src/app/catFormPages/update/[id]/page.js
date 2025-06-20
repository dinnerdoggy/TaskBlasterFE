'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleCategory } from '@/api/categoryData';
import CategoryForm from '@/components/forms/CategoryForm';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../utils/context/authContext';

export default function UpdateCategoryPage({ params }) {
  const [editItem, setEditItem] = useState(null);
  const { id } = params;
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getSingleCategory(id, user.uid).then((data) => {
      if (!data) {
        // Category doesn't exist (was deleted or bad ID) → redirect
        router.push('/');
      } else {
        setEditItem(data);
      }
    });
  }, [id, user.uid]);

  return editItem ? <CategoryForm obj={editItem} /> : <div>Loading...</div>;
}

UpdateCategoryPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
