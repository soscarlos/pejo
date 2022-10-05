
const ShowReminder = ({showReminder, setShowReminder, 
    updateModalOpen, setUpdateModalOpen,}) => {
     
    return (
       
        <div className="showReminder">
             <button onClick={() => {
          setUpdateModalOpen(true);
          console.log(updateModalOpen)
          setShowReminder(showReminder);      
        }}>Update</button>
             <button>Delete</button>

            <h3>{showReminder.title}</h3>
            <p>{showReminder.description}</p>
            <p>{showReminder.date + " | " + showReminder.time}</p>           
        </div>
    )
}

export default ShowReminder;