'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getResources } from '../../api/resourceData';
import ResourceCard from '../../components/ResourceCard';

export default function RecourcesPage() {
  const [resources, setResources] = useState([]);
  const { user } = useAuth();

  const getAllTheRecources = () => {
    getResources(user.uid).then(setResources);
  };

  useEffect(() => {
    getAllTheRecources();
  }, []);

  return (
    <>
      <h1 className="categoryTitle">Resources</h1>
      <div className="resources">
        {resources.map((res) => (
          <ResourceCard key={res.id} resourceObj={res} onUpdate={getAllTheRecources} />
        ))}
      </div>
    </>
  );
}
