import ShowReminders from './ShowReminders';
import { ModalContext, UpdateModalContext, ShowReminderContext, UseFetchRemindersContext,
   FetchUrlContext, 
   ReminderNotificationModalContext} from './reminderContext';
import { useState, useContext } from "react";
import useFetchToken from '../../hooks/useFetchToken';
import useAuthorization from '../../hooks/useAuthorization';
import './style.css';


const Reminder = () => {
  const { authorization } = useAuthorization();
  const storedToken = localStorage.getItem('token');
  const token = storedToken? storedToken : authorization.accessToken;

  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [reminderNotificationModalOpen, setReminderNotificationModalOpen] = useState(false);
  const [showReminder, setShowReminder] = useState(null);

  const fetchUrl = useContext(FetchUrlContext);
 
  return (

    <UseFetchRemindersContext.Provider value={{reminders: useFetchToken(fetchUrl, token).data,
      setReminders: useFetchToken(fetchUrl, token).setData}}>
    <ModalContext.Provider value={{modalOpen: modalOpen, toggleModalOpen: setModalOpen}}>
    <UpdateModalContext.Provider value={{updateModalOpen: updateModalOpen,
       toggleUpdateModalOpen: setUpdateModalOpen}}>
    <ReminderNotificationModalContext.Provider value={{reminderNotificationModalOpen: reminderNotificationModalOpen,
    toggleReminderNotificationModalOpen: setReminderNotificationModalOpen}}> 
    <ShowReminderContext.Provider value={{showReminder: showReminder,
           setShowReminder: setShowReminder}}>       
            
            <div>
             <ShowReminders />
            </div>
            
    </ShowReminderContext.Provider>
    </ReminderNotificationModalContext.Provider> 
    </UpdateModalContext.Provider>
   </ModalContext.Provider>
   </UseFetchRemindersContext.Provider>
  )
}

export default Reminder