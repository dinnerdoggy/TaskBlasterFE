/* eslint-disable import/no-extraneous-dependencies */
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';

const onDelete = () => {
  console.log('Delete clicked');
};

function DutyCard({ dutyObj }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/category/update/${dutyObj.id}`);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Dropdown align="end">
          <Dropdown.Toggle variant="link" bsPrefix="p-0 border-0 btn" id="ellipsis-dropdown">
            <BsThreeDotsVertical size={20} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleEdit}>
              <FaEdit className="me-2" />
              Edit
            </Dropdown.Item>
            <Dropdown.Item onClick={onDelete}>
              <FaTrash className="me-2 text-danger" />
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Card.Title>{dutyObj.title}</Card.Title>
        <hr />
        <Card.Subtitle className="mb-2 text-muted">{dutyObj.dueDate}</Card.Subtitle>
        <Card.Text>{dutyObj.description}</Card.Text>
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
    dueDate: PropTypes.instanceOf(Date),
  }).isRequired,
};

export default DutyCard;
