import { useState } from "react";
import { useEffect } from "react";
import AddReminderModal from "./AddReminderModal";
import ShowReminder from "./ShowReminder";
import "../../App.css";
import usePost from "../../hooks/usePost";
import usePut from "../../hooks/usePut";

const ShowReminders = () => {

    const [reminders, setReminders] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [showReminder, setShowReminder] = useState(null);

  
    const usePostAddReminder = async(reminder) => {
      const newData = await usePost(reminder, 'http://localhost:8080/reminders');
      setReminders([...reminders, newData]);
    }
     

    const usePutUpdateReminder = async (reminder) => {
        console.log(`reminderId=${reminder.showReminderId}`)
        const newData = await usePut(reminder, 'http://localhost:8080/reminders');
        console.log(`newData=${newData.id}, ${newData.title}`)
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

   useEffect(()=> {

        const getData = async() => {
          try{
            const response = await fetch("http://localhost:8080/reminders");
            if (!response.ok){
              throw new Error(`HTTP error: Status ${response.status}`);
            }
            let actualData = await response.json();
            setReminders(actualData);
          } catch(e) {
            setReminders(null);
          }
        }
        getData();
      }, ["http://localhost:8080/reminders"]);

      
        
    return (
      <div>
        {modalOpen && <AddReminderModal showReminder={reminders[0]} 
              updateModalOpen={updateModalOpen} setUpdateModalOpen={setUpdateModalOpen} 
              modalOpen={modalOpen} setModalOpen={setModalOpen} onAdd={usePostAddReminder} />}
        
        {updateModalOpen && <AddReminderModal showReminder={showReminder} 
             updateModalOpen={updateModalOpen} setUpdateModalOpen={setUpdateModalOpen}
             modalOpen={modalOpen} setModalOpen={setModalOpen} onAdd={usePutUpdateReminder} />}          
      <div className="container2">
        <div className="reminderHeader">
        <h1>Reminders</h1>
          <button onClick={() => {
          setModalOpen(true);
        }}>Add Reminder</button>   
        </div>
        {reminders!= null? reminders.map(showReminder => (
          <ShowReminder key={showReminder.id} 
             showReminder={showReminder} setShowReminder={setShowReminder}
             updateModalOpen={updateModalOpen} setUpdateModalOpen={setUpdateModalOpen}
             modalOpen={modalOpen} setModalOpen={setModalOpen} onAdd={usePutUpdateReminder}
             modalOpen={modalOpen} />
        )) : "No Reminders"}             
      </div>
      </div>     
    )  
}

export default ShowReminders;