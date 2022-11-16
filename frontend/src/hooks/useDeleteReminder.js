import useDelete from "./useDelete";

const useDeleteReminder = async (reminder, reminders, setReminders, url, token) => {
    useDelete(url, token);
    var currentReminder = reminders.filter(r => r.id === reminder.id)[0];
    console.log('currentid=' + currentReminder.id)
    var index = reminders.indexOf(currentReminder);
    setReminders([...reminders.splice(index, 1)]);
    console.log('length=' + reminders.length)
  }
  export default useDeleteReminder;