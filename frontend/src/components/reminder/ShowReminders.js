import { useState } from "react";
import { useEffect } from "react";
import AddReminderModal from "./AddReminderModal";
import ShowReminder from "./ShowReminder";

const ShowReminders = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const openAddReminderModal = ()=> {
      return (
        <AddReminderModal />
      )


    }

    

    useEffect(()=> {

        const getData = async() => {
          try{
            const response = await fetch("http://localhost:8080/pets");
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
      }, ["http://localhost:8080/pets"]);
        getData();
    return (
      <div>
        <span display={"inline-block"}><h1>Reminders</h1><button float={"right"} onclick={openAddReminderModal}>Add Reminder</button></span>
        {data.map(showReminder => (
          <ShowReminder key={showReminder.id} showReminder={showReminder} />
        ))}
      </div>
    )
    
    
}

export default ShowReminders;