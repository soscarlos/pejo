import Card from 'react-bootstrap/Card';
import ReminderItem from './ReminderItem';
import useFetchReminders from '../../../hooks/useFetchReminders'
import './style.css';
import useAuthorization from '../../../hooks/useAuthorization';
import { useNavigate } from 'react-router-dom';

const ReminderCard = () => {
    const { authorization } = useAuthorization();
    const storedToken = localStorage.getItem('token');
    const { reminders, isLoading, error } = useFetchReminders(storedToken? storedToken : authorization.accessToken);
    const navigate = useNavigate();
    
    const redirect = () => {
        navigate("/reminders");
    }
    return (
        <Card id='reminderCard' border="light">
            <Card.Body>
            <Card.Title id='reminderTitle' onClick={redirect} > Reminders </Card.Title>
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
  