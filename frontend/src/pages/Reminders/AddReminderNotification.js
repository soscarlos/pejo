import { useContext, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./style.css";
import { IsPetContext, ReminderNotificationModalContext, ShowReminderContext, UseFetchRemindersContext } from "./reminderContext";
import { PetReminderContext, UseFetchPetRemindersContext } from "../PetProfiles/petContext";

const AddReminderNotification = ({ onAdd}) => {

    const token = localStorage.getItem('token');

    const reminderNotificationModal = useContext(ReminderNotificationModalContext);

    const isPet = useContext(IsPetContext).isPet;

    const currentContext = isPet ? PetReminderContext : ShowReminderContext;
    const currentReminder = useContext(currentContext);
    const id = currentReminder.showReminder.id;

    const fetchUrl = 'http://localhost:8080/reminders/' + id;
    let reminders = useContext(UseFetchRemindersContext).reminders;
    const setReminders = useContext(UseFetchRemindersContext).setReminders;

    let petReminders = useContext(UseFetchPetRemindersContext).petReminders;
    const setPetReminders = useContext(UseFetchPetRemindersContext).setPetReminders;

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isPet) {
            onAdd({ date,time }, reminders, setReminders, fetchUrl, token);
            reminderNotificationModal.toggleReminderNotificationModalOpen(false);
         } else {
            onAdd({ date, time }, petReminders, setPetReminders, fetchUrl, token);
            reminderNotificationModal.toggleReminderNotificationModalOpen(false);
         }
         setDate('');
         setTime('');

    }

    return (
        <container>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" placeholder='Add date' value={date}
              onChange={(e) => setDate(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Time</Form.Label>
            <Form.Control type='time' placeholder='Add time' value={time}
              onChange={(e) => setTime(e.target.value)}/>
          </Form.Group>
          <Button id='reminderNotificationSubmitButton' type="submit">
            Submit
          </Button>
        </Form>
        </container>  
      ) 

}

export default AddReminderNotification;