/* eslint-disable import/no-extraneous-dependencies */
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import { deleteDuty } from '../api/dutyData';
import { useAuth } from '../utils/context/authContext';

function DutyCard({ dutyObj, onUpdate }) {
  const router = useRouter();

  const { user } = useAuth();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteDuty(dutyObj.id, user.uid).then(() => {
        onUpdate();
      });
    }
  };

  const handleEdit = () => {
    router.push(`/category/update/${dutyObj.id}`);
  };

  return (
    <Card className="taskCard">
      <Card.Body>
        <Card.Title className="taskTitle">
          {dutyObj.title}

          <Dropdown align="center">
            <Dropdown.Toggle variant="link" bsPrefix="p-0 border-0 btn" id="ellipsis-dropdown">
              <BsThreeDotsVertical className="elipsis" size={20} />
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
        <Card.Text>{dutyObj.description}</Card.Text>
        {dutyObj.comments?.length > 0 && (
          <div>
            <strong>Comments:</strong>
            <ul className="resource-list">
              {dutyObj.comments.map((com) => (
                <li key={com.id}>
                  <span>{com.content}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {dutyObj.resources?.length > 0 && (
          <div>
            <strong>Resources:</strong>
            <ul className="resource-list">
              {dutyObj.resources.map((res) => (
                <li key={res.id}>
                  <a className="linkColor" href={res.url} target="_blank" rel="noopener noreferrer">
                    {res.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {dutyObj.dueDate && (
          <Card.Subtitle className="priorityStatus">
            <span>Due:</span>{' '}
            {new Date(dutyObj.dueDate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
            })}
          </Card.Subtitle>
        )}

        <p className="priorityStatus">Priority: {dutyObj.priority}</p>
      </Card.Body>
    </Card>
  );
}

DutyCard.propTypes = {
  dutyObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    isCompleted: PropTypes.bool,
    priority: PropTypes.string,
    dueDate: PropTypes.instanceOf(Date),
    comments: PropTypes.shape(),
    resources: PropTypes.shape(),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default DutyCard;
