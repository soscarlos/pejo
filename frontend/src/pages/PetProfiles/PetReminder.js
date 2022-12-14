import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { UseFetchPetRemindersContext, PetUpdateModalContext, PetReminderContext } from './petContext';
import { FetchUrlContext, ReminderNotificationModalContext } from '../Reminders/reminderContext';
import { useContext } from 'react';


const PetReminder = ({petReminder, onDelete}) => {

    const token = localStorage.getItem('token');

    const petUpdateModal = useContext(PetUpdateModalContext);
    const reminderNotificationModal = useContext(ReminderNotificationModalContext);
    const currentReminder = useContext(PetReminderContext);
    const petReminders = useContext(UseFetchPetRemindersContext).petReminders;
    const setPetReminders = useContext(UseFetchPetRemindersContext).setPetReminders;
    const fetchUrl = useContext(FetchUrlContext) + '/' + petReminder.id;


    return (
        <Card id='shownPetReminder'>
            <Card.Body>
                <Card.Title>{petReminder.title}</Card.Title>
                <Card.Text id='shownReminderText'>{petReminder.description}<br/>
                {petReminder.date + " | " + petReminder.time}</Card.Text>
                <Button className="reminderButton float-end" onClick={() => {
                    reminderNotificationModal.toggleReminderNotificationModalOpen(true);
                    currentReminder.setShowReminder(petReminder); 
                }}>Add Notification</Button>
                <Button className="reminderButton float-end" onClick={() => {
                    petUpdateModal.toggleUpdateModalOpen(true);
                    currentReminder.setShowReminder(petReminder);      
                }}>Update</Button>
                <Button className="reminderButton float-end" onClick={() => {
                    onDelete(petReminder, petReminders, setPetReminders, fetchUrl, token);
                }}>Delete</Button>
            </Card.Body>
        </Card>
    )

}

export default PetReminder;