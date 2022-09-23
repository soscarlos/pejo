import Card from 'react-bootstrap/Card';

const ShowReminder = ({showReminder}) => {
    return (
      
        <div className="showReminder">
            <h3>{showReminder.title}</h3>
            <p>{showReminder.description}</p>
            <p>{showReminder.date + " | " + showReminder.time}</p>           
        </div>
    )
}

export default ShowReminder;