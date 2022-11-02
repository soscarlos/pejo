import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FetchUrlContext, ShowReminderContext, UpdateModalContext, UseFetchRemindersContext, IsPetContext } from './reminderContext';
import { PetIdContext, PetUpdateModalContext, FetchPetUrlContext, UseFetchPetRemindersContext, PetReminderContext } from '../PetProfiles/petContext';

const UpdateReminder = ({ onAdd }) => {

    

    //const currentReminder = useContext(ShowReminderContext);
    //const currentPetReminder = useContext(PetReminderContext)
    const updateModal = useContext(UpdateModalContext);
    const petUpdateModal = useContext(PetUpdateModalContext);

    const petId = useContext(PetIdContext).petId;
    const isPet = useContext(IsPetContext).isPet;

    const currentContext = isPet ? PetReminderContext : ShowReminderContext;
    const currentReminder = useContext(currentContext);

    const id = currentReminder.showReminder.id;
    const [date, setDate] = useState(currentReminder.showReminder.date);
    const [time, setTime] = useState(currentReminder.showReminder.time);
    const [title, setTitle] = useState(currentReminder.showReminder.title);
    const [description, setDescription] = useState(currentReminder.showReminder.description);

    const fetchUrl = useContext(FetchUrlContext);
    let reminders = useContext(UseFetchRemindersContext).reminders;
    const setReminders = useContext(UseFetchRemindersContext).setReminders;

    let petReminders = useContext(UseFetchPetRemindersContext).petReminders;
    const setPetReminders = useContext(UseFetchPetRemindersContext).setPetReminders;

  

    const onSubmit = (e) => {
        e.preventDefault(); 
        if (!isPet) {
           onAdd({ id, title, date, time, description }, reminders, setReminders, fetchUrl, false);
           updateModal.toggleUpdateModalOpen(false);
        } else {
           onAdd({ id, title, date, time, description }, petReminders, setPetReminders, fetchUrl, false);
           petUpdateModal.toggleUpdateModalOpen(false);
        }
        setTitle('');
        setDate('');
        setDescription('');
        setTime('');
      }

    return (
      <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type='text' placeholder='Add title' value={title}
          onChange={(e) => setTitle(e.target.value)}/>
      </Form.Group>
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
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control type='text' placeholder='Add description' value={description}
          onChange={(e) => setDescription(e.target.value)}/>
      </Form.Group>
      <Button id='reminderSubmitButton' type="submit">
        Submit
      </Button>
    </Form>
    ) 
}
export default UpdateReminder