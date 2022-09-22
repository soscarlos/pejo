
const ShowReminder = (({showReminder}) => {
    return (
        <div className="showReminder">
            <h3>{"TITLE: " + showReminder.title}</h3>
            <h3>{"DATE: " + showReminder.date}</h3>
            <h3>{"TIME: " + showReminder.time}</h3>
            <h3>ACTIVE: {showReminder.active === true? "yes" : "no"}</h3>        
            <h3>DESCRIPTION:</h3>
            <p>{showReminder.description}</p>
            
            {/*<h3>Pets:</h3>
             showReminder.pets.map(pet => (
                <p key={pet.id}>{pet.id}</p>
            ))
            */}
             
        </div>
    )
})

export default ShowReminder;