import Card from 'react-bootstrap/Card';

const ShowReminder = ({showReminder}) => {
     


    return (
       
        <div className="showReminder">
             <button onClick={}>Update</button>
             <button onClick={}>Delete</button>
            <h3>{showReminder.title}</h3>
            <p>{showReminder.description}</p>
            <p>{showReminder.date + " | " + showReminder.time}</p>           
        </div>
    )
}

export default ShowReminder;