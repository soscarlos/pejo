import { useState } from "react";
import { useEffect } from "react";
import AddReminderModal from "./AddReminderModal";
import ShowReminder from "./ShowReminder";
import "../../App.css"

const ShowReminders = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

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
      console.log(data);
        
    return (
      <div>
        {modalOpen && <AddReminderModal setOpenModal={setModalOpen} />}

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