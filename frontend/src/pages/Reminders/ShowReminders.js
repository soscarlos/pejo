import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AddReminderModal from "./AddReminderModal";
import ShowReminder from "./ShowReminder";
import useFetch from '../../hooks/useFetch';
import usePost from "../../hooks/usePost";
import usePut from "../../hooks/usePut";
import useDelete from "../../hooks/useDelete";
import "./style.css";

const ShowReminders = () => {
  let reminders = useFetch('http://localhost:8080/reminders').data;
  const setReminders = useFetch('http://localhost:8080/reminders').setData;
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [showReminder, setShowReminder] = useState(null);


  const usePostAddReminder = async(reminder) => {
    const newData = await usePost(reminder, 'http://localhost:8080/reminders');

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
    

  const usePutUpdateReminder = async (reminder) => {
      console.log(`reminderId=${reminder.showReminderId}`)
      const newData = await usePut(reminder, 'http://localhost:8080/reminders');

      let currentReminder = reminders[0];
      for (let reminder of reminders) {
        if (reminder.id === newData.id) {
          currentReminder = reminder;
        }
      }
      currentReminder.title = newData.title;
      currentReminder.date = newData.date;
      currentReminder.time = newData.time;
      currentReminder.description = newData.description;
      setReminders([...reminders]);
    }

  
  const useDeleteReminder = async (reminder) => {
    useDelete(`http://localhost:8080/reminders/${reminder.id}`);
    var currentReminder = reminders.filter(r => r.id === reminder.id)[0];
    var index = reminders.indexOf(currentReminder);
    setReminders([...reminders.splice(index, 1)]);
  }
  

  return (
    <Container id="reminderContainer">
      <Row id="reminderRow">
        <Col>
          <Card id="reminders">
            <Card.Body>
              {modalOpen && <AddReminderModal showReminder={reminders[0]}
              updateModalOpen={updateModalOpen} setUpdateModalOpen={setUpdateModalOpen}
              modalOpen={modalOpen} setModalOpen={setModalOpen} onAdd={usePostAddReminder} />}
              {updateModalOpen && <AddReminderModal showReminder={showReminder} 
              updateModalOpen={updateModalOpen} setUpdateModalOpen={setUpdateModalOpen}
              modalOpen={modalOpen} setModalOpen={setModalOpen} onAdd={usePutUpdateReminder} />}
              <Card.Title id='remindersTitle'>Reminders
                <Button id='addReminderButton' className="float-end" onClick={() => {
                  setModalOpen(true);
                }}>Add Reminder</Button>
              </Card.Title>
              <Card.Text>
                {reminders!= null? reminders.map(showReminder => (
                <ShowReminder key={showReminder.id}
                showReminder={showReminder} setShowReminder={setShowReminder}
                updateModalOpen={updateModalOpen} setUpdateModalOpen={setUpdateModalOpen}
                modalOpen={modalOpen} setModalOpen={setModalOpen} onAdd={usePutUpdateReminder}
                onDelete={useDeleteReminder}/>
                )) : "No Reminders"}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ShowReminders;