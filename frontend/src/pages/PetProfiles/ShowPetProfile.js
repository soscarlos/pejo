
import './style.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useContext, useEffect, useState } from 'react';
import AddReminderModal from '../Reminders/AddReminderModal';
import PetReminder from './PetReminder'
import useDeleteReminder from '../../hooks/useDeleteReminder';
import usePutUpdateReminder from '../../hooks/usePutUpdateReminder';
import { UseFetchPetRemindersContext, UseFetchPetsContext, PetModalContext, PetUpdateModalContext } from './petContext';

 const ShowPetProfile = () => {

    let petData = useContext(UseFetchPetsContext).pet;    
    const modal = useContext(PetModalContext);

    const updateModal = useContext(PetUpdateModalContext);
    const petReminders = useContext(UseFetchPetRemindersContext).petReminders;
   

    return (
        <container id='petContainer'>
      <Row id="petRow">
        <Col>
         <Card id='shownPet'>
            {petData != null &&
            <Card.Body>                     
                <Card.Title>{petData.name}</Card.Title>
                <Card.Text id='shownPetText'>
                {petData.sexType + " | " + petData.birthDate}</Card.Text>
            </Card.Body>
           }
         </Card>
         </Col>
         </Row>
         
        <Row id="petRemindersRow">
        <Col>
         <Card id='shownPetReminders'>         
            <Card.Body>
               {modal.modalOpen && <AddReminderModal onAdd={usePutUpdateReminder} />}
               {updateModal.updateModalOpen && <AddReminderModal onAdd={usePutUpdateReminder} />}    
                <Card.Title>Reminders</Card.Title>
                <Button id='addPetReminderButton' className="float-end" onClick={() => {
                 modal.toggleModalOpen(true);
                }}>Add Reminder</Button>
                {<Card.Text id='shownPetReminders'>
                {petReminders != null ? petReminders.map(petReminder => (
                <PetReminder key={petReminder.id}
                petReminder={petReminder} onDelete={useDeleteReminder}/>
                )) : "No Reminders"}
                </Card.Text>}
                </Card.Body>
         </Card>
         </Col>
         </Row>
        </container>        
    )
}

export default ShowPetProfile;