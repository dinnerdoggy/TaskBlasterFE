'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleDuty } from '@/api/dutyData';
import DutyForm from '@/components/forms/DutyForm';

export default function UpdateDutyPage({ params }) {
  const [editItem, setEditItem] = useState({});
  const { id } = params; // assuming the dynamic route is [id]

  useEffect(() => {
    getSingleDuty(id).then(setEditItem);
  }, [id]);

  return <DutyForm obj={editItem} />;
}

UpdateDutyPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
