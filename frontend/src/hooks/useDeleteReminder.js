import useDelete from "./useDelete";

const useDeleteReminder = async (reminder, reminders, setReminders, url, token) => {
    useDelete(url, token);
    var currentReminder = reminders.filter(r => r.id === reminder.id)[0];
    var index = reminders.indexOf(currentReminder);
    setReminders([...reminders.splice(index, 1)]);
  }
  export default useDeleteReminder;