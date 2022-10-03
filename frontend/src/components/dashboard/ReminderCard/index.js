
import Card from 'react-bootstrap/Card';
import ReminderItem from './ReminderItem';
import useFetchReminders from '../../../hooks/useFetchReminders'
import './style.css';

const ReminderCard = () => {

    const { reminders, isLoading, error } = useFetchReminders();
    console.log(reminders);
    return (
        <Card id='reminderCard' border="light">
            <Card.Body>
            <Card.Title id='reminderTitle'> <a href='/reminders'> Reminders </a> </Card.Title>
            <Card.Text>
                {isLoading && <span> Loading, please wait... </span>}
                {error && (<span> {`there is a problem fetching the data ${error}`} </span> )}
                
                {reminders && reminders.map(showReminder => (
                    <ReminderItem key={showReminder.id} showReminder={showReminder} />
                        ))}
                
            </Card.Text>
            </Card.Body>
        </Card>    
    )
  };
  
  export default ReminderCard;
  