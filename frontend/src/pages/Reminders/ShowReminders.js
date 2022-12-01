import { useContext } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AddReminderModal from "./AddReminderModal";
import ShowReminder from "./ShowReminder";
import useDeleteReminder from "../../hooks/useDeleteReminder";
import usePostAddReminder from "../../hooks/usePostAddReminder";
import usePutUpdateReminder from "../../hooks/usePutUpdateReminder";
import usePatchAddNotificationToReminder from "../../hooks/usePatchAddNotificationToReminder";
import { ModalContext, ReminderNotificationModalContext, UseFetchRemindersContext } from "./reminderContext";
import { UpdateModalContext } from "./reminderContext";
import "./style.css";
import ReminderNotificationModal from "./ReminderNotificationModal";

const ShowReminders = () => {
  const modal = useContext(ModalContext);
  const updateModal = useContext(UpdateModalContext);
  const reminderNotificationModal = useContext(ReminderNotificationModalContext);
  
  let reminders = useContext(UseFetchRemindersContext).reminders;

  return (
    <Container id="reminderContainer">
      <Row id="reminderRow">
        <Col>
          <Card id="reminders">
            <Card.Body>
              {modal.modalOpen && <AddReminderModal onAdd={{first: usePostAddReminder, second: usePutUpdateReminder}} />}
              {updateModal.updateModalOpen && <AddReminderModal onAdd={usePutUpdateReminder} />}
              {reminderNotificationModal.reminderNotificationModalOpen && <ReminderNotificationModal onAdd={usePatchAddNotificationToReminder} />}
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