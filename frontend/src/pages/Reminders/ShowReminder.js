import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { FetchUrlContext, UpdateModalContext, ShowReminderContext,
     UseFetchRemindersContext, 
     ReminderNotificationModalContext} from './reminderContext';


const ShowReminder = ({showReminder, onDelete}) => {
        const token = localStorage.getItem('token');

        const updateModal = useContext(UpdateModalContext);
        const reminderNotificationModal = useContext(ReminderNotificationModalContext);
        const currentReminder = useContext(ShowReminderContext);
        const fetchUrl = useContext(FetchUrlContext)+ '/' + showReminder.id;
        let reminders = useContext(UseFetchRemindersContext).reminders;
        const setReminders = useContext(UseFetchRemindersContext).setReminders;
     
    return (
        <Card id='shownReminder'>
            <Card.Body>
                <Card.Title>{showReminder.title}</Card.Title>
                <Card.Text id='shownReminderText'>{showReminder.description}<br/>
                {showReminder.date + " | " + showReminder.time}</Card.Text>
                <Button className="reminderButton float-end" onClick={() => {
                    reminderNotificationModal.toggleReminderNotificationModalOpen(true);
                    currentReminder.setShowReminder(showReminder); 
                }}>Add Notification</Button>
                <Button className="reminderButton float-end" onClick={() => {
                    updateModal.toggleUpdateModalOpen(true);
                    currentReminder.setShowReminder(showReminder);      
                }}>Update</Button>
                <Button className="reminderButton float-end" onClick={() => {
                    onDelete(showReminder, reminders, setReminders, fetchUrl, token);
                }}>Delete</Button>
            </Card.Body>
        </Card>
    )
}

export default ShowReminder;