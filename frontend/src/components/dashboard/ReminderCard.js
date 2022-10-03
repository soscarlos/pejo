
import Card from 'react-bootstrap/Card';
import ReminderItem from './cardComponents/ReminderItem';
import useFetchReminders from '../../hooks/useFetchReminders'

const ReminderCard = () => {

    const { reminders, isLoading, error } = useFetchReminders();
    console.log(reminders);
    return (
        <Card style={{backgroundColor: "#fa9801"}} border="light">
            <Card.Body>
            <Card.Title style={{color: "white"}}> <a href='/reminders'> Reminders </a> </Card.Title>
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
  