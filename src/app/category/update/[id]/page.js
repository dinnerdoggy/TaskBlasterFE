'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleDuty } from '@/api/dutyData';
import DutyForm from '@/components/forms/DutyForm';
import { useAuth } from '../../../../utils/context/authContext';

export default function UpdateDutyPage({ params }) {
  const [editItem, setEditItem] = useState(null);
  const { id } = params;
  const { user } = useAuth();

  useEffect(() => {
    getSingleDuty(id, user.uid).then(setEditItem);
  }, [id]);

  return editItem ? <DutyForm obj={editItem} /> : <div>Loading...</div>;
}

UpdateDutyPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
