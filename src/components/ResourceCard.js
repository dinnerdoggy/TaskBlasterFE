'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ResourceCard({ resource, onEdit, onDelete }) {
  return (
    <Card style={{ width: '18rem' }} className="taskCard border">
      <Card.Body>
        <Card.Title>{resource.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{resource.type}</Card.Subtitle>
        <Card.Text>{resource.description}</Card.Text>

        {resource.url && (
          <Card.Link href={resource.url} target="_blank" rel="noopener noreferrer">
            Visit Resource
          </Card.Link>
        )}

        <div className="mt-3 d-flex justify-content-between">
          <Button variant="primary" onClick={() => onEdit(resource)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => onDelete(resource.id)}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

ResourceCard.propTypes = {
  resource: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ResourceCard;
