import { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./style.css";
import { FetchUrlContext, IsPetContext, ModalContext, UseFetchRemindersContext } from "./reminderContext";
//ToDO import useFetchToken
import useFetch from '../../hooks/useFetch';

import { PetIdContext, UseFetchPetRemindersContext, FetchPetUrlContext, PetModalContext } from '../PetProfiles/petContext';

const AddReminder = ({ onAdd }) => {
    const token = localStorage.getItem('token');

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const modal = useContext(ModalContext);
    const petModal = useContext(PetModalContext);

    // ToDo addUseFetchToken
    const pets = useFetch('http://localhost:8080/pets').data;
    
    
    useEffect(() => {if (!isPet && pets != null) {pets.forEach(element => {
      document.getElementById(element.id).addEventListener('change', handleCheckbox)});}},
      pets);
    
    const [reminderPets, setReminderPets] = useState([]);
  
    const petId = useContext(PetIdContext).petId;
    const isPet = useContext(IsPetContext).isPet;

    const fetchUrl = useContext(FetchUrlContext);
    let reminders = useContext(UseFetchRemindersContext).reminders;
    const setReminders = useContext(UseFetchRemindersContext).setReminders;

    const fetchAddPetReminderUrl = useContext(FetchPetUrlContext) + petId;
    let petReminders = useContext(UseFetchPetRemindersContext).petReminders;
    const setPetReminders = useContext(UseFetchPetRemindersContext).setPetReminders;

    const handleCheckbox = (e) => {
      const currentPetId = e.currentTarget.value;
      var currentPet = null;
      for (let pet of pets) {
        if (pet.id - currentPetId === 0) {
          currentPet = pet;
        }
      }
      //const currentPet = pets.filter((el) => {return el.id === currentPetId})[0];
      if (e.currentTarget.checked) {    
        setReminderPets(arr => [...arr, currentPet]);      
      } else {
        setReminderPets((current) => {current.filter((el) => {return el.id != currentPetId;})});       
      }
    }
    

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isPet) {

          const id = await onAdd.first({ title, date, time, description }, reminders, setReminders, fetchUrl, token);
          for (let pet of reminderPets) {
            onAdd.second({ id, title, date, time, description }, null, 
              null, 'http://localhost:8080/pets/'+pet.id, false, token);
          }
          setReminderPets([]);

          modal.toggleModalOpen(false);
        } else {
            onAdd({ title, date, time, description }, petReminders, setPetReminders, fetchAddPetReminderUrl, isPet, token);
            petModal.toggleModalOpen(false);
        }
        setTitle('');
        setDate('');
        setDescription('');
        setTime('');
      }

    return (
      <container>
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
      {!isPet && pets != null ? pets.map(pet =>
        <div>
        <input type="checkbox" id={pet.id} name={"addPet"+pet.id} value={pet.id}></input>
        <label for={"addPet"+pet.id} >add to {pet.name}</label>
        </div>
        ) : ""}
      </container>  
    ) 
}
export default AddReminder