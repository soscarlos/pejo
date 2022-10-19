import { useContext, useState } from "react";
import AddReminderModal from "./AddReminderModal";
import ShowReminder from "./ShowReminder";
import "./style.css";
import useFetch from '../../hooks/useFetch';
import usePost from "../../hooks/usePost";
import usePut from "../../hooks/usePut";
import useDelete from "../../hooks/useDelete";
import { ModalContext } from "./reminderContext";
import useFetchReminders from "../../hooks/useFetchReminders";

const ShowReminders = () => {
    
    let reminders = useFetch('http://localhost:8080/reminders').data;
    const setReminders = useFetch('http://localhost:8080/reminders').setData;
    //const [modalOpen, setModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [showReminder, setShowReminder] = useState(null);
    
    
  
    const usePostAddReminder = async(reminder) => {
      const newData = await usePost(reminder, 'http://localhost:8080/reminders');

      let currentReminder = {
        id: newData.id,
        title: newData.title,
        time: newData.time,
        date: newData.date,
        description: newData.description
      }
      reminders.push(currentReminder);
      setReminders([...reminders]);
    }
     

    const usePutUpdateReminder = async (reminder) => {
        console.log(`reminderId=${reminder.showReminderId}`)
        const newData = await usePut(reminder, 'http://localhost:8080/reminders');

        let currentReminder = reminders[0];
        for (let reminder of reminders) {
          if (reminder.id === newData.id) {
            currentReminder = reminder;
          }
        }
        currentReminder.title = newData.title;
        currentReminder.date = newData.date;
        currentReminder.time = newData.time;
        currentReminder.description = newData.description;
        setReminders([...reminders]);
      }
  
    
    const useDeleteReminder = async (reminder) => {
      useDelete(`http://localhost:8080/reminders/${reminder.id}`);
      var currentReminder = reminders.filter(r => r.id === reminder.id)[0];
      var index = reminders.indexOf(currentReminder);
      setReminders([...reminders.splice(index, 1)]);
    }
    
  
    const modal = useContext(ModalContext);
    console.log(modal.modalOpen)
   
    return (    
      <div>
        {modal.modalOpen && <AddReminderModal showReminder={reminders[0]} 
              updateModalOpen={updateModalOpen} setUpdateModalOpen={setUpdateModalOpen} 
              modalOpen={modal.modalOpen} setModalOpen={modal.toggleModalOpen} onAdd={usePostAddReminder} />}
        
        {updateModalOpen && <AddReminderModal showReminder={showReminder} 
             updateModalOpen={updateModalOpen} setUpdateModalOpen={setUpdateModalOpen}
             modalOpen={modal.modalOpen} setModalOpen={modal.toggleModalOpen} onAdd={usePutUpdateReminder} />}          
      <div className="container2">
        <div className="reminderHeader">
        <h1>Reminders</h1>
          <button onClick={() => {
          modal.toggleModalOpen(true);
        }}>Add Reminder</button>   
        </div>
        {reminders!= null? reminders.map(showReminder => (
          <ShowReminder key={showReminder.id} 
             showReminder={showReminder} setShowReminder={setShowReminder}
             updateModalOpen={updateModalOpen} setUpdateModalOpen={setUpdateModalOpen}
             modalOpen={modal.modalOpen} setModalOpen={modal.toggleModalOpen} onAdd={usePutUpdateReminder} 
             onDelete={useDeleteReminder}/>
        )) : "No Reminders"}             
      </div>
      </div>   
    )  
}

export default ShowReminders;