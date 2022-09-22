import { useEffect, useState, useRef } from 'react';
import "../../App.css";
import AddReminderModal from './AddReminderModal';



const AddReminder = ({ onAdd, openModal }) => {
    const [date, setDate] = useState('');
    //const [time, setTime] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    //const time = new Date().getTime();

    const onSubmit = (e) => {
        e.preventDefault(); 
        onAdd({ title, date, description });
        setTitle('');
        setDate('');
        setDescription('');
      }
  
    useEffect(() => {
      const addForm = document.getElementsByClassName('add-form')[0];
      //console.log(addForm)
      openModal? addForm.setAttribute("style", "display: block") : addForm.setAttribute("style", "display: none");
     
    })

    return (
        <form className='add-form' onSubmit={onSubmit}>
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
            type='text'
            placeholder='Add Date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
       {/* <div className='form-control form-control-check'>
          <label>Set Reminder</label>
          <input
            type='checkbox'
            checked={reminder}
            value={reminder}
            onChange={(e) => setReminder(e.currentTarget.checked)}
          />
    </div>*/}
  
        <input type='submit' value='Save Reminder' className='btn btn-block' />
      </form>
    ) 
}
export default AddReminder