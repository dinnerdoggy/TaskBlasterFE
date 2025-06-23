'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleResource } from '@/api/resourceData';
import ResourceForm from '@/components/forms/ResourceForm';
import { useAuth } from '../../../../utils/context/authContext';

export default function UpdateResourcePage({ params }) {
  const [editItem, setEditItem] = useState(null);
  const { id } = params;
  const { user } = useAuth();

  useEffect(() => {
    getSingleResource(id, user.uid).then(setEditItem);
  }, [id, user.uid]);

  return editItem ? <ResourceForm obj={editItem} /> : <div>Loading...</div>;
}

UpdateResourcePage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
