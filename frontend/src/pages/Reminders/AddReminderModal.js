import AddReminder from "./AddReminder";
import UpdateReminder from "./UpdateReminder";
import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal';
import "./style.css";
import { IsPetContext, ModalContext, UpdateModalContext } from "./reminderContext";
import { PetModalContext, PetUpdateModalContext } from "../PetProfiles/petContext";
import { useContext } from "react";

const AddReminderModal = ({ onAdd })=> {

    const isPet = useContext(IsPetContext).isPet;
    const modal = useContext(ModalContext);
    const updateModal = useContext(UpdateModalContext);
    const petModal = useContext(PetModalContext);
    const petUpdateModal = useContext(PetUpdateModalContext);

    const modalOpen = modal.modalOpen;
    const updateModalOpen = updateModal.updateModalOpen;
    const petModalOpen = isPet && petModal.modalOpen;
    const petUpdateModalOpen = isPet && petUpdateModal.updateModalOpen;
    

  return (
    <Modal show={modalOpen || petModalOpen || updateModalOpen || petUpdateModalOpen}>
      <Modal.Header>
        <Modal.Title>
          {(modalOpen || petModalOpen) && <h1>Add Reminder</h1>}
          {(updateModalOpen || petUpdateModalOpen) && <h1>Update Reminder</h1>}
        </Modal.Title>
        {<CloseButton
          onClick={() => {
            if (!isPet) {
            updateModal.toggleUpdateModalOpen(false);
            modal.toggleModalOpen(false);  
            } else {
              petUpdateModal.toggleUpdateModalOpen(false)
              petModal.toggleModalOpen(false);
            }            
          }}>
        </CloseButton>}
      </Modal.Header>
      <Modal.Body>
       {(modalOpen || petModalOpen) && <AddReminder onAdd={onAdd} /> }
        {(updateModalOpen || petUpdateModalOpen) && <UpdateReminder onAdd={onAdd} /> }
      </Modal.Body>
    </Modal>
      );
    }
    
export default AddReminderModal;