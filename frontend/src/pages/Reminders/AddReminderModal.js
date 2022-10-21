import AddReminder from "./AddReminder";
import UpdateReminder from "./UpdateReminder";
import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal';
import "./style.css";
import { ModalContext, UpdateModalContext } from "./reminderContext";
import { useContext } from "react";

const AddReminderModal = ({ onAdd })=> {

    const modal = useContext(ModalContext);
    const updateModal = useContext(UpdateModalContext);

  return (
    <Modal show={modal.modalOpen || updateModal.updateModalOpen}>
      <Modal.Header>
        <Modal.Title>
          {modal.modalOpen && <h1>Add Reminder</h1>}
          {updateModal.updateModalOpen && <h1>Update Reminder</h1>}
        </Modal.Title>
        <CloseButton
          onClick={() => {
            updateModal.toggleUpdateModalOpen(false);
            modal.toggleModalOpen(false);              
          }}>
        </CloseButton>
      </Modal.Header>
      <Modal.Body>
        {modal.modalOpen && <AddReminder onAdd={onAdd} /> }
        {updateModal.updateModalOpen && <UpdateReminder onAdd={onAdd} /> }
      </Modal.Body>
    </Modal>
      );
    }
    
export default AddReminderModal;