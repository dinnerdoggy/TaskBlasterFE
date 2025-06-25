'use client';

import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import { deleteResource } from '../api/resourceData';
import { useAuth } from '../utils/context/authContext';

function ResourceCard({ resourceObj, onUpdate }) {
  const router = useRouter();
  const { user } = useAuth();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      deleteResource(resourceObj.id, user.uid).then(() => {
        onUpdate();
      });
    }
  };

  const handleEdit = () => {
    router.push(`/resources/update/${resourceObj.id}`);
  };

  return (
    <Card className="clipBoard">
      <Card.Body>
        <Card.Title className="flex">
          {resourceObj.title}

          <Dropdown className="lastItem" align="center">
            <Dropdown.Toggle variant="link" bsPrefix="p-0 border-0 btn" id="ellipsis-dropdown">
              <BsThreeDotsVertical className="elipsisBlack" size={20} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleEdit}>
                <FaEdit className="me-2" />
                Edit
              </Dropdown.Item>
              <Dropdown.Item onClick={handleDelete}>
                <FaTrash className="me-2 text-danger" />
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Title>

        <hr />
        <Card.Subtitle className="mb-2 text-muted">{resourceObj.type}</Card.Subtitle>
        <Card.Text
          style={{
            maxHeight: '10.5rem',
            overflowY: 'auto',
            paddingRight: '8px',
          }}
        >
          {resourceObj.description}
        </Card.Text>

        {resourceObj.url && (
          <Card.Link href={resourceObj.url} target="_blank" rel="noopener noreferrer">
            Visit Resource
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}

ResourceCard.propTypes = {
  resourceObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ResourceCard;
