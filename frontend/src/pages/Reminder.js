import ShowReminders from '../components/reminder/ShowReminders';
import AddReminder from '../components/reminder/AddReminder';
import UpdateReminder from '../components/reminder/UpdateReminder';
import DeleteReminder from '../components/reminder/DeleteReminder';


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