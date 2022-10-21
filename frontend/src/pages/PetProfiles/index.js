import { UseFetchPetRemindersContext, UseFetchPetsContext, UpdateModalContext, 
  ModalContext, PetReminderContext } from './petContext';
import ShowPetProfile from './ShowPetProfile';
import useFetch from '../../hooks/useFetch';
import { useContext, useState } from "react";

import './style.css';
import { ShowReminderContext } from '../Reminders/reminderContext';

const PetProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [petReminder, setPetReminder] = useState(null);




  return (
    <UseFetchPetsContext.Provider value={{ pet: useFetch('http://localhost:8080/pets/1').data,
    setPet: useFetch('http://localhost:8080/pets/1').setData}}>
      <ModalContext.Provider value={{modalOpen: modalOpen, toggleModalOpen: setModalOpen}}>
      <UpdateModalContext.Provider value={{updateModalOpen: updateModalOpen,
       toggleUpdateModalOpen: setUpdateModalOpen}}>
         <PetReminderContext.Provider value={{petReminder: petReminder,
           setPetReminder: setPetReminder}}> 
           <UseFetchPetRemindersContext.Provider value={{ petReminders: 
            useFetch('http://localhost:8080/reminders/pet/1').data,
            setPetReminders: useFetch('http://localhost:8080/reminders/pet/1').setData }}>
    <div>
        <ShowPetProfile />
    </div>
    </UseFetchPetRemindersContext.Provider>  
    </PetReminderContext.Provider>
    </UpdateModalContext.Provider>
    </ModalContext.Provider>
    </UseFetchPetsContext.Provider>
  )
}

export default PetProfile;