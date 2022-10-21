import { useContext, useState } from "react";
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
import useDeleteReminder from "../../hooks/useDeleteReminder";
import { FetchUrlContext, ModalContext, ShowReminderContext, UseFetchRemindersContext } from "./reminderContext";
import { UpdateModalContext } from "./reminderContext";
import "./style.css";

const ShowReminders = () => {
  const fetchUrl = useContext(FetchUrlContext);
  const modal = useContext(ModalContext);
  const updateModal = useContext(UpdateModalContext);
  let reminders = useContext(UseFetchRemindersContext).reminders;
  const setReminders = useContext(UseFetchRemindersContext).setReminders;
  


  const usePostAddReminder = async(reminder) => {
    const newData = await usePost(reminder, fetchUrl);

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
      const newData = await usePut(reminder, fetchUrl);

      let currentReminder = reminders.filter(r => r.id === newData.id)[0];   
      currentReminder.title = newData.title;
      currentReminder.date = newData.date;
      currentReminder.time = newData.time;
      currentReminder.description = newData.description;
      setReminders([...reminders]);
    }

  return (
    <Container id="reminderContainer">
      <Row id="reminderRow">
        <Col>
          <Card id="reminders">
            <Card.Body>
              {modal.modalOpen && <AddReminderModal onAdd={usePostAddReminder} />}
              {updateModal.updateModalOpen && <AddReminderModal onAdd={usePutUpdateReminder} />}
              <Card.Title id='remindersTitle'>Reminders
                <Button id='addReminderButton' className="float-end" onClick={() => {
                  modal.toggleModalOpen(true);
                }}>Add Reminder</Button>
              </Card.Title>
              <Card.Text>
                {reminders != null ? reminders.map(showReminder => (
                <ShowReminder key={showReminder.id}
                showReminder={showReminder} onDelete={useDeleteReminder}/>
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