import Card from 'react-bootstrap/Card';

const ReminderCard = () => {
    return (
        <Card>
            <Card.Body>
            <Card.Title>Reminders</Card.Title>
            <Card.Text>
                <ul>
                    <li>Pajti vaccination</li>
                    <li>Mogli deworming</li>
                </ul>
            </Card.Text>
            </Card.Body>
        </Card>    
    )
  };
  
  export default ReminderCard;
  