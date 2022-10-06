
const ShowReminder = ({showReminder, setShowReminder, 
    setUpdateModalOpen, onDelete}) => {
     
    return (
       
        <div className="showReminder">
             <button onClick={() => {
          setUpdateModalOpen(true);
          setShowReminder(showReminder);      
        }}>Update</button>
             <button onClick={() => {
                 onDelete(showReminder);
             }
             }>Delete</button>

            <h3>{showReminder.title}</h3>
            <p>{showReminder.description}</p>
            <p>{showReminder.date + " | " + showReminder.time}</p>           
        </div>
    )
}

export default ShowReminder;