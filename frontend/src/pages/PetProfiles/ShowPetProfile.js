import useFetch from '../../hooks/useFetch';
import './style.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useContext, useEffect, useState } from 'react';
import ShowReminder from '../Reminders/ShowReminder';
import AddReminderModal from '../Reminders/AddReminderModal';
import PetReminder from './PetReminder'
import useDeleteReminder from '../../hooks/useDeleteReminder';
import { UseFetchPetRemindersContext, UseFetchPetsContext, ModalContext, UpdateModalContext } from './petContext';

 const ShowPetProfile = () => {

    let petData = useContext(UseFetchPetsContext).pet;    
    const modal = useContext(ModalContext);
    const updateModal = useContext(UpdateModalContext);
    const petReminders = useContext(UseFetchPetRemindersContext).petReminders;
    const setPetReminders = useContext(UseFetchPetRemindersContext).setPetReminders;

    return (
        <container id='petContainer'>
         <Card id='shownPet'>
            {petData != null &&
            <Card.Body>
                     
                <Card.Title>{petData.name}</Card.Title>
                <Card.Text id='shownPetText'>
                {petData.sexType + " | " + petData.birthDate}</Card.Text>

            </Card.Body>
           }
         </Card>

         <Card id='shownPetReminders'>         
            <Card.Body>
               {/*modal.modalOpen && <AddReminderModal onAdd={usePostAddReminder} />*/}
               {/*updateModal.updateModalOpen && <AddReminderModal onAdd={usePutUpdateReminder} />}*/}     
                <Card.Title>Reminders</Card.Title>
                {/* <Button id='addPetReminderButton' className="float-end" onClick={() => {
                 // modal.toggleModalOpen(true);
                }}>Add Reminder</Button> */}
                <Card.Text id='shownPetReminders'>
                {petReminders != null ? petReminders.map(petReminder => (
                <PetReminder key={petReminder.id}
                petReminder={petReminder} onDelete={useDeleteReminder}/>
                )) : "No Reminders"}
                </Card.Text>
                </Card.Body>
         </Card>
        </container>        
    )
}

export default ShowPetProfile;