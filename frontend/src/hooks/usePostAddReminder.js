import usePost from "./usePost";

const usePostAddReminder = async(reminder, reminders, setReminders, url, token) => {
    const newData = await usePost(reminder, url, token);

    let currentReminder = {
      id: newData.id,
      title: newData.title,
      time: newData.time,
      date: newData.date,
      description: newData.description,
    }
    reminders.push(currentReminder);
    setReminders([...reminders]);

    return newData.id;
  }

  export default usePostAddReminder;