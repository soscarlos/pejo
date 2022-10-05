import React, { useEffect, useState } from 'react';

const UpdateReminder = ({ showReminderId, showReminderTitle, 
    showReminderDate, showReminderTime, showReminderDescription,
    updateModalOpen, onAdd }) => {
    console.log(`id=${showReminderId}, ${showReminderTitle}`);
    const id = showReminderId;
    const [date, setDate] = useState(showReminderDate);
    const [time, setTime] = useState(showReminderTime);
    const [title, setTitle] = useState(showReminderTitle);
    const [description, setDescription] = useState(showReminderDescription);
    

    const onSubmit = (e) => {
        e.preventDefault(); 
        onAdd({ id, title, date, time, description });
        setTitle('');
        setDate('');
        setDescription('');
        setTime('');
      }
  
    useEffect(() => {
      const updateForm = document.getElementsByClassName('update-form')[0];
      updateModalOpen ? updateForm.setAttribute("style", "display: inline-block") : 
      updateForm.setAttribute("style", "display: none");     
    })

    return (
        <form className='update-form' onSubmit={onSubmit}>
        <div className='form-control'>
          <label>Title</label>
          <input
            type='text'
            placeholder='Add Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label>Date</label>
          <input
            type='date'
            placeholder='Add Date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label>Time</label>
          <input
            type='time'
            placeholder='Add Time'
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label>Description</label>
          <input
            type='text'
            placeholder='Add Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <input style={{ background: 'grey' }} type='submit' value='Save Reminder' 
        className='btn btn-block' />
      </form>
    ) 
}
export default UpdateReminder