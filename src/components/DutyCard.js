import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

function DutyCard({ dutyObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{dutyObj.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{dutyObj.dueDate}</Card.Subtitle>
        <Card.Text>{dutyObj.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

DutyCard.propTypes = {
  dutyObj: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    isCompleted: PropTypes.bool,
    dueDate: PropTypes.instanceOf(Date),
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};

export default DutyCard;
