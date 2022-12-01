import { useContext } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal';
import AddReminderNotification from './AddReminderNotification';
import { ReminderNotificationModalContext } from './reminderContext';
import "./style.css";

const ReminderNotificationModal = ( {onAdd} ) => {

    const reminderNotificationModal = useContext(ReminderNotificationModalContext);
    const reminderNotificationModalOpen = reminderNotificationModal.reminderNotificationModalOpen;

    return (
        <Modal show={reminderNotificationModalOpen} >
          <Modal.Header>
            <Modal.Title>
              <h1>Add Reminder Notification</h1>
            </Modal.Title>
            {<CloseButton
              onClick={() => {
                  reminderNotificationModal.toggleReminderNotificationModalOpen(false);                       
              }}>
            </CloseButton>}
          </Modal.Header>
          <Modal.Body>
           {reminderNotificationModalOpen && <AddReminderNotification onAdd={onAdd} /> }
          </Modal.Body>
        </Modal>
          );
}

export default ReminderNotificationModal;