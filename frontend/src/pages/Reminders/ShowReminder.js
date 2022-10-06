import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ShowReminder = ({showReminder, setShowReminder, 
    setUpdateModalOpen, onDelete}) => {
     
    return (
        <Card id='shownReminder'>
            <Card.Body>
                <Card.Title>{showReminder.title}</Card.Title>
                <Card.Text id='shownReminderText'>{showReminder.description}<br/>
                {showReminder.date + " | " + showReminder.time}</Card.Text>
                <Button className="reminderButton float-end" onClick={() => {
                    setUpdateModalOpen(true);
                    setShowReminder(showReminder);      
                }}>Update</Button>
                <Button className="reminderButton float-end" onClick={() => {
                    onDelete(showReminder);
                }}>Delete</Button>
            </Card.Body>
        </Card>
    )
}

export default ShowReminder;