import { useState } from "react";
import { useEffect } from "react";
import AddReminderModal from "./AddReminderModal";
import ShowReminder from "./ShowReminder";
import "../../App.css";

const ShowReminders = () => {

    const [data, setData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);


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
          } catch(e) {
            setData(null);
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