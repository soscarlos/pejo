
const ShowReminder = (({showReminder}) => {
    return (
        <div className="showReminder">
            <h3>{"ID: " + showReminder.id}</h3>
            <h3>{"DATE: " + showReminder.date}</h3>
            <h3>{"TIME: " + showReminder.time}</h3>
            <h3>{"TITLE: " + showReminder.title}</h3>
            <h3>Description:</h3>
            <p>{showReminder.description}</p>
            <h3>{"Active: " + showReminder.active === true? "yes" : "no"}</h3>
            <h3>Pets:</h3>
            { showReminder.pets.map(pet => (
                <p key={pet.id}>{pet.id}</p>
            ))
            }
             
        </div>
    )
})

export default ShowReminder;