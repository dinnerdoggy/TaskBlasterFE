'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDutiesByCat } from '../../../api/dutyData';
import DutyCard from '../../../components/DutyCard';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleCategory } from '../../../api/categoryData';

function DutyByCategoryPage({ params }) {
  // Destructure category ID from dynamic route params
  const { id } = params;
  const { user } = useAuth();
  const [duties, setDuties] = useState([]);
  const [category, setCategory] = useState('...Loading');

  // Create a function to fetch duties by category
  const getAllDutiesByCategory = () => {
    getDutiesByCat(id, user.uid).then((data) => {
      console.log('API call response: ', data);
      setDuties(data);
    });
  };

  const getCurrentCategory = () => {
    getSingleCategory(id, user.uid).then(setCategory);
  };

  useEffect(() => {
    getCurrentCategory();
  }, []);

  // Call function when component mounts or when ID changes
  useEffect(() => {
    getAllDutiesByCategory();
  }, [id]);

  return (
    <div className="dutiesPage">
      <h1 className="mb-4 categoryTitle">{category.title}</h1>
      <div className="mainPage">
        {/* map over duties here using DutyCard component */}
        {duties.map((duty) => (
          <DutyCard key={duty.id} dutyObj={duty} onUpdate={getAllDutiesByCategory} />
        ))}
      </div>
    </div>
  );
}

DutyByCategoryPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default DutyByCategoryPage;
