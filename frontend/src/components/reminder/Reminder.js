import ShowReminders from './ShowReminders';
import AddReminder from './AddReminder';
import UpdateReminder from './UpdateReminder';
import DeleteReminder from './DeleteReminder';


const Reminder = () => {
  return (
    <div>
        Reminder
        <ShowReminders />
        <AddReminder />
        <UpdateReminder />
        <DeleteReminder />
    </div>
  )
}

export default Reminder