import { useState } from "react";
import { useEffect } from "react";
import AddReminderModal from "./AddReminderModal";
//import AddReminder from "./AddReminder";
import ShowReminder from "./ShowReminder";
import ReminderItem from '../dashboard/reminderCardComponents/ReminderItem';
import "../../App.css";

const ShowReminders = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const addForm = document.getElementsByClassName('add-form')[0];


      const addReminder = async (reminder) => {
        console.log("addReminder here")
       const res = await fetch('http://localhost:8080/reminders', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(reminder),
        })
        const newData = await res.json();
        setData([...data, newData]);
        console.log(reminder);
      }


    useEffect(()=> {

        const getData = async() => {
          try{
            const response = await fetch("http://localhost:8080/reminders");
            if (!response.ok){
              throw new Error(`HTTP error: Status ${response.status}`);
            }
            let actualData = await response.json();
            setData(actualData);
            setError(null);
          } catch(e) {
            setError(e);
            setData(null);
          } finally {
            setLoading(false);
          }
        }
        getData();
      }, ["http://localhost:8080/reminders"]);

      
        
    return (
      <div>
        {modalOpen && <AddReminderModal setOpenModal={setModalOpen} onAdd={addReminder} openModal={modalOpen}/>}              
      <div className="container2">
        <div className="reminderHeader">
        <h1>Reminders</h1>
          <button onClick={() => {
          setModalOpen(true);
        }}>Add Reminder</button>   
        </div>
        {data != null? data.map(showReminder => (
        
          <ShowReminder key={showReminder.id} showReminder={showReminder} />
        )) : "No Reminders"}             
      </div>
      </div>
      
    )
    
    
}

export default ShowReminders;