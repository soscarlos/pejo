import usePatch from "./usePatch";

const usePatchAddNotificationToReminder = async (reminder, reminders, setReminders, url, token) => {
    const newData = await usePatch(reminder, url, token);
    console.log(newData)
      if (reminders != null) {
       let currentReminder = reminders.filter(r => r.id === newData.id)[0];   
       currentReminder.title = newData.title;
       currentReminder.date = newData.date;
       currentReminder.time = newData.time;
       currentReminder.description = newData.description; 
       currentReminder.reminderDate = newData.reminderDate;
       currentReminder.reminderTime = newData.reminderTime;     
       setReminders([...reminders]);
       } 
  }
  export default usePatchAddNotificationToReminder;