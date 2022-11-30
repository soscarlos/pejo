import { UseFetchPetRemindersContext, UseFetchPetsContext, PetUpdateModalContext, 
  PetModalContext, PetReminderContext, PetIdContext, FetchPetUrlContext, FetchPetRemindersUrlContext } from './petContext';
import ShowPetProfile from './ShowPetProfile';
import useFetchToken from '../../hooks/useFetchToken';
import { useContext, useState } from "react";
import useAuthorization from '../../hooks/useAuthorization';
import { IsPetContext, ReminderNotificationModalContext } from '../Reminders/reminderContext';
import './style.css';


const PetProfile = ({ petId }) => {
  const { authorization } = useAuthorization();
  const storedToken = localStorage.getItem('token');
  const token = storedToken? storedToken : authorization.accessToken;

  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [reminderNotificationModalOpen, setReminderNotificationModalOpen] = useState(false);
  const [petReminder, setPetReminder] = useState(null);

  const fetchPetUrl = useContext(FetchPetUrlContext);
  const fetchPetRemindersUrl = useContext(FetchPetRemindersUrlContext);

  return (
    <PetIdContext.Provider value={{petId: petId}}>
    <IsPetContext.Provider value={{isPet: true}}>
    <UseFetchPetsContext.Provider value={{ pet: useFetchToken(fetchPetUrl + petId, token).data,
    setPet: useFetchToken(fetchPetUrl + petId, token).setData}}>
      <PetModalContext.Provider value={{modalOpen: modalOpen, toggleModalOpen: setModalOpen}}>
      <PetUpdateModalContext.Provider value={{updateModalOpen: updateModalOpen,
       toggleUpdateModalOpen: setUpdateModalOpen}}>
         <ReminderNotificationModalContext.Provider value={{reminderNotificationModalOpen: reminderNotificationModalOpen,
          toggleReminderNotificationModalOpen: setReminderNotificationModalOpen}}> 
         <PetReminderContext.Provider value={{showReminder: petReminder,
           setShowReminder: setPetReminder}}> 
           <UseFetchPetRemindersContext.Provider value={{ petReminders: 
            useFetchToken(fetchPetRemindersUrl + petId, token).data,
            setPetReminders: useFetchToken(fetchPetRemindersUrl + petId, token).setData }}>
    <div>
        <ShowPetProfile />
    </div>
    </UseFetchPetRemindersContext.Provider>  
    </PetReminderContext.Provider>
    </ReminderNotificationModalContext.Provider>
    </PetUpdateModalContext.Provider>
    </PetModalContext.Provider>
    </UseFetchPetsContext.Provider>
    </IsPetContext.Provider>
    </PetIdContext.Provider>
  )
}

export default PetProfile;