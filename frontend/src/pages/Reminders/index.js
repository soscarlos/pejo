import ShowReminders from './ShowReminders';
import { ModalContext} from './reminderContext';
import { useState } from "react";

import './style.css';


const Reminder = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{modalOpen: modalOpen, toggleModalOpen: setModalOpen}}>
    <div>
        <ShowReminders />
    </div>
   </ModalContext.Provider>
  )
}

export default Reminder