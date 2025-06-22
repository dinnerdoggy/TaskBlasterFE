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
    <div>
      {resources.map((res) => (
        <ResourceCard key={res.id} resource={res} onUpdate={getAllTheRecources} />
      ))}
    </div>
  );
}
