import usePut from "./usePut";

const usePutUpdateReminder = async (reminder, reminders, setReminders, url, isPet, token) => {
    const newData = await usePut(reminder, url, token);
    console.log("newId="+newData.id)
    if (!isPet) {
       let currentReminder = reminders.filter(r => r.id === newData.id)[0];   
       currentReminder.title = newData.title;
       currentReminder.date = newData.date;
       currentReminder.time = newData.time;
       currentReminder.description = newData.description;
       setReminders([...reminders]);
    } else {
      let currentReminder = {
        title: reminder.title,
        time: reminder.time,
        date: reminder.date,
        description: reminder.description
      }
      reminders.push(currentReminder);
      setReminders([...reminders]);

    }
  }


  export default usePutUpdateReminder;
