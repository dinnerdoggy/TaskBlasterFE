'use client';

import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import { deleteComment } from '../api/commentData';
import { useAuth } from '../utils/context/authContext';

function CommentCard({ commentObj, onUpdate }) {
  const router = useRouter();
  const { user } = useAuth();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment(commentObj.id, user.uid).then(() => {
        onUpdate();
      });
    }
  };

  const handleEdit = () => {
    router.push(`/commentFormPages/update/${commentObj.id}`);
  };

  return (
    <Card className="taskCard border">
      <Card.Body>
        <Card.Title className="taskTitle">
          <Dropdown align="center">
            <Dropdown.Toggle variant="link" bsPrefix="p-0 border-0 btn" id="ellipsis-dropdown">
              <BsThreeDotsVertical className="elipsis" size={20} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleEdit}>
                <FaEdit className="me-2" />
                Edit Comment
              </Dropdown.Item>
              <Dropdown.Item onClick={handleDelete}>
                <FaTrash className="me-2 text-danger" />
                Delete Comment
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Title>
        <Card.Text>{commentObj.content}</Card.Text>

        {commentObj.timeStamp && (
          <Card.Subtitle className="mb-2 text-muted">
            {new Date(commentObj.timeStamp).toLocaleString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Card.Subtitle>
        )}
      </Card.Body>
    </Card>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string,
    timeStamp: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentCard;
