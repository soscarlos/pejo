import { useEffect, useState } from "react";
import usePost from "./usePost";
import usePutUpdateReminder from "./usePutUpdateReminder";

const usePostAddReminder = async(reminder, reminders, setReminders, url) => {
    const newData = await usePost(reminder, url);
    console.log("postId="+newData.id)
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