import { useState } from "react";
import { useEffect } from "react";
import AddReminderModal from "./AddReminderModal";
import ShowReminder from "./ShowReminder";

const ShowReminders = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    

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
        getData();
      }, ["http://localhost:8080/pets"]);
      console.log(data);
        
    return (
      <div>
        <span style={{display: "inline-block"}}>
          <h1>Reminders</h1>
          </span>
          <span style={{display: "inline-block",float: "right"}}>
          <button onClick={() => {
          setModalOpen(true);
        }}>Add Reminder</button>
          </span>
          <span style={{display: "block"}}>
        {data != null? data.map(showReminder => (
          <ShowReminder key={showReminder.id} showReminder={showReminder} />
        )) : "No Reminders"}
        {modalOpen && <AddReminderModal setOpenModal={setModalOpen} />}
        </span>
      </div>
    )
    
    
}

export default ShowReminders;