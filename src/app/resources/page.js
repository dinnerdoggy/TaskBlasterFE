'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { useAuth } from '../../utils/context/authContext';
import { getResources } from '../../api/resourceData';
import ResourceCard from '../../components/ResourceCard';

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const { user } = useAuth();

  const getAllTheResources = () => {
    getResources(user.uid).then(setResources);
  };

  useEffect(() => {
    getAllTheResources();
  }, []);

  return (
    <>
      <h1 className="categoryTitle flex">
        Resources
        <Link className="nav-link" href="/resources/new">
          <BsFillPlusSquareFill className="addBtn toTheRight" />
        </Link>
      </h1>
      <div className="resources">
        {resources.map((res) => (
          <ResourceCard key={res.id} resourceObj={res} onUpdate={getAllTheResources} />
        ))}
      </div>
    </>
  );
}
