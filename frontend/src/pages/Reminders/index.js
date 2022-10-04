import ShowReminders from '../../components/reminder/ShowReminders';
import AddReminder from '../../components/reminder/AddReminder';
import UpdateReminder from '../../components/reminder/UpdateReminder';
import DeleteReminder from '../../components/reminder/DeleteReminder';
import './style.css';

const Reminder = () => {
  return (
    <div>
        <ShowReminders />
        <AddReminder />
        <UpdateReminder />
        <DeleteReminder />
    </div>
  )
}

export default Reminder