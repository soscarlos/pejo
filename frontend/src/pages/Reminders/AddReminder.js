import { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./style.css";
import { FetchUrlContext, IsPetContext, ModalContext, ShowReminderContext, UseFetchRemindersContext } from "./reminderContext";
import { PetIdContext, UseFetchPetRemindersContext, FetchPetUrlContext, PetModalContext } from '../PetProfiles/petContext';

const AddReminder = ({ onAdd }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const modal = useContext(ModalContext);
    const petModal = useContext(PetModalContext);
  
    const petId = useContext(PetIdContext).petId;
    const isPet = useContext(IsPetContext).isPet;

    const fetchUrl = useContext(FetchUrlContext);
    let reminders = useContext(UseFetchRemindersContext).reminders;
    const setReminders = useContext(UseFetchRemindersContext).setReminders;

    const fetchAddPetReminderUrl = useContext(FetchPetUrlContext) + petId;
    let petReminders = useContext(UseFetchPetRemindersContext).petReminders;
    const setPetReminders = useContext(UseFetchPetRemindersContext).setPetReminders;
    

    const onSubmit = (e) => {
        e.preventDefault();
        if (!isPet) {
          onAdd({ title, date, time, description }, reminders, setReminders, fetchUrl);
          modal.toggleModalOpen(false);
        } else {
            onAdd({ title, date, time, description }, petReminders, setPetReminders, fetchAddPetReminderUrl, isPet);
            petModal.toggleModalOpen(false);
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
export default AddReminder