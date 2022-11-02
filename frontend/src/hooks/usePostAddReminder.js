import usePost from "./usePost";

const usePostAddReminder = async(reminder, reminders, setReminders, url) => {
    const newData = await usePost(reminder, url);

    let currentReminder = {
      id: newData.id,
      title: newData.title,
      time: newData.time,
      date: newData.date,
      description: newData.description
    }
    reminders.push(currentReminder);
    setReminders([...reminders]);
  }

  export default usePostAddReminder;