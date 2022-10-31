import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { UseFetchPetRemindersContext, UpdateModalContext, PetReminderContext } from './petContext';
import { FetchUrlContext } from '../Reminders/reminderContext';
import { useContext, useEffect, useState } from 'react';



const PetReminder = ({petReminder, onDelete}) => {

    const updateModal = useContext(UpdateModalContext);
    const currentReminder = useContext(PetReminderContext);
    const petReminders = useContext(UseFetchPetRemindersContext).petReminders;
    const setPetReminders = useContext(UseFetchPetRemindersContext).setPetReminders;
    const fetchUrl = useContext(FetchUrlContext) + '/' + petReminder.id;
    console.log(petReminder.id)


    return (
        <Card id='shownPetReminder'>
            <Card.Body>
                <Card.Title>{petReminder.title}</Card.Title>
                <Card.Text id='shownReminderText'>{petReminder.description}<br/>
                {petReminder.date + " | " + petReminder.time}</Card.Text>
                <Button className="reminderButton float-end" onClick={() => {
                    updateModal.toggleUpdateModalOpen(true);
                    currentReminder.setPetReminder(petReminder);      
                }}>Update</Button>
                <Button className="reminderButton float-end" onClick={() => {
                    onDelete(petReminder, petReminders, setPetReminders, fetchUrl);
                }}>Delete</Button>
            </Card.Body>
        </Card>
    )

}

export default PetReminder;