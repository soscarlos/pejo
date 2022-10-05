import { useState } from 'react';
import "../../App.css";

const AddReminder = ({ setModalOpen, onAdd }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    

    const onSubmit = (e) => {
        e.preventDefault(); 
        onAdd({ title, date, time, description });
        setTitle('');
        setDate('');
        setDescription('');
        setTime('');
        setModalOpen(false);

      }

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
export default AddReminder