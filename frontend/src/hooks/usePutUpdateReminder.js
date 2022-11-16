import usePut from "./usePut";

const usePutUpdateReminder = async (reminder, reminders, setReminders, url, isPet) => {
    const newData = await usePut(reminder, url);
    console.log("updateId="+reminder.id)
    console.log("newId="+newData.petReminders[0].id)
    if (!isPet) {
      if (reminders != null) {
       let currentReminder = reminders.filter(r => r.id === newData.id)[0];   
       currentReminder.title = newData.title;
       currentReminder.date = newData.date;
       currentReminder.time = newData.time;
       currentReminder.description = newData.description;      
       setReminders([...reminders]);
       }

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
