import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ReminderItem from './cardComponents/ReminderItem';

const ReminderCard = () => {
    const remindersEndPoint = 'http://localhost:8080/reminders/first3ByDate';
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const getReminders = async () => {
            try {
                const response = await fetch(remindersEndPoint);
                if (!response.ok){
                    throw new Error(`HTTP error: Status ${response.status}`);
                }
                let reminders = await response.json();
                setData(reminders);
                setError(null);
            } catch(e) {
                setError(e);
                setData(null);
            } finally {
                setLoading(false);
            }
        }

        getReminders();

    }, [remindersEndPoint]);

    return (
        <Card style={{backgroundColor: "#fa9801"}}>
            <Card.Body>
            <Card.Title style={{color: "white"}}> <a href='/reminders'> Reminders </a> </Card.Title>
            <Card.Text>
                {loading && <span> Loading, please wait... </span>}
                {error && (<span> {`there is a problem fetching the data ${error}`} </span> )}
                
                {data && data.map(showReminder => (
                    <ReminderItem key={showReminder.id} showReminder={showReminder} />
                        ))}
                
            </Card.Text>
            </Card.Body>
        </Card>    
    )
  };
  
  export default ReminderCard;
  