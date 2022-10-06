import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./style.css";

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
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' placeholder='Add title' value={title}
            onChange={(e) => setTitle(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" placeholder='Add date' value={date}
            onChange={(e) => setDate(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control type='time' placeholder='Add time' value={time}
            onChange={(e) => setTime(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control type='text' placeholder='Add description' value={description}
            onChange={(e) => setDescription(e.target.value)}/>
        </Form.Group>
        <Button id='reminderSubmitButton' type="submit">
          Submit
        </Button>
      </Form>
    ) 
}
export default AddReminder