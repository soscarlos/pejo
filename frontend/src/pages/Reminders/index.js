import ShowReminders from './ShowReminders';
import { ModalContext, UpdateModalContext, ShowReminderContext, UseFetchRemindersContext,
   FetchUrlContext, IsPetContext} from './reminderContext';
import { FetchPetUrlContext, PetIdContext, UseFetchPetRemindersContext } from '../PetProfiles/petContext';
import { useState, useContext } from "react";
import useFetch from '../../hooks/useFetch'; 
import './style.css';


const Reminder = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [showReminder, setShowReminder] = useState(null);

  const fetchUrl = useContext(FetchUrlContext);
 
  return (

    <UseFetchRemindersContext.Provider value={{ reminders: useFetch(fetchUrl).data,
      setReminders: useFetch(fetchUrl).setData }}>
    <ModalContext.Provider value={{modalOpen: modalOpen, toggleModalOpen: setModalOpen}}>
    <UpdateModalContext.Provider value={{updateModalOpen: updateModalOpen,
       toggleUpdateModalOpen: setUpdateModalOpen}}>
    <ShowReminderContext.Provider value={{showReminder: showReminder,
           setShowReminder: setShowReminder}}>       
            
            <div>
             <ShowReminders />
            </div>
            
    </ShowReminderContext.Provider>
    </UpdateModalContext.Provider>
   </ModalContext.Provider>
   </UseFetchRemindersContext.Provider>
  )
}

export default Reminder