import { UseFetchPetRemindersContext, UseFetchPetsContext, PetUpdateModalContext, 
  PetModalContext, PetReminderContext, PetIdContext, FetchPetUrlContext, FetchPetRemindersUrlContext } from './petContext';
import ShowPetProfile from './ShowPetProfile';
import useFetch from '../../hooks/useFetch';
import { useContext, useState } from "react";
import './style.css';
import { ShowReminderContext } from '../Reminders/reminderContext';
import { IsPetContext } from '../Reminders/reminderContext';

const PetProfile = ({ petId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [petReminder, setPetReminder] = useState(null);

  const fetchPetUrl = useContext(FetchPetUrlContext);
  const fetchPetRemindersUrl = useContext(FetchPetRemindersUrlContext);

  return (
    <PetIdContext.Provider value={{petId: petId}}>
    <IsPetContext.Provider value={{isPet: true}}>
    <UseFetchPetsContext.Provider value={{ pet: useFetch(fetchPetUrl + petId).data,
    setPet: useFetch(fetchPetUrl + petId).setData}}>
      <PetModalContext.Provider value={{modalOpen: modalOpen, toggleModalOpen: setModalOpen}}>
      <PetUpdateModalContext.Provider value={{updateModalOpen: updateModalOpen,
       toggleUpdateModalOpen: setUpdateModalOpen}}>
         <PetReminderContext.Provider value={{showReminder: petReminder,
           setShowReminder: setPetReminder}}> 
           <UseFetchPetRemindersContext.Provider value={{ petReminders: 
            useFetch(fetchPetRemindersUrl + petId).data,
            setPetReminders: useFetch(fetchPetRemindersUrl + petId).setData }}>
    <div>
        <ShowPetProfile />
    </div>
    </UseFetchPetRemindersContext.Provider>  
    </PetReminderContext.Provider>
    </PetUpdateModalContext.Provider>
    </PetModalContext.Provider>
    </UseFetchPetsContext.Provider>
    </IsPetContext.Provider>
    </PetIdContext.Provider>
  )
}

export default PetProfile;