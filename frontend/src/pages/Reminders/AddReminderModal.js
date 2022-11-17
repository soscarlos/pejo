import AddReminder from "./AddReminder";
import UpdateReminder from "./UpdateReminder";
import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal';
import "./style.css";
import { IsPetContext, ModalContext, UpdateModalContext } from "./reminderContext";
import { AddPetModalContext, PetModalContext, PetUpdateModalContext } from "../PetProfiles/petContext";
import { useContext } from "react";
import AddPet from "../Layout/AddPet";

const AddReminderModal = ({ onAdd })=> {

    const isPet = useContext(IsPetContext).isPet;
    const modal = useContext(ModalContext);
    const updateModal = useContext(UpdateModalContext);
    const petModal = useContext(PetModalContext);
    const petUpdateModal = useContext(PetUpdateModalContext);
    const addPetModal = useContext(AddPetModalContext);

    const modalOpen = modal.modalOpen;
    const updateModalOpen = updateModal.updateModalOpen;
    const petModalOpen = isPet && petModal.modalOpen;
    const petUpdateModalOpen = isPet && petUpdateModal.updateModalOpen;
    const addPetModalOpen = addPetModal.addPetModalOpen;
    

  return (
    <Modal show={modalOpen || petModalOpen || updateModalOpen || petUpdateModalOpen || addPetModalOpen}>
      <Modal.Header>
        <Modal.Title>
          {(modalOpen || petModalOpen) && <h1>Add Reminder</h1>}
          {(updateModalOpen || petUpdateModalOpen) && <h1>Update Reminder</h1>}
          {addPetModalOpen && <h1>Add Pet</h1>}
        </Modal.Title>
        {<CloseButton
          onClick={() => {
            if (!isPet && modalOpen || updateModalOpen) {
            updateModal.toggleUpdateModalOpen(false);
            modal.toggleModalOpen(false);  
            } else if (isPet) {
              petUpdateModal.toggleUpdateModalOpen(false)
              petModal.toggleModalOpen(false);
            } else {
              addPetModal.toggleAddPetModalOpen(false)
            }           
          }}>
        </CloseButton>}
      </Modal.Header>
      <Modal.Body>
       {(modalOpen || petModalOpen) && <AddReminder onAdd={onAdd} /> }
        {(updateModalOpen || petUpdateModalOpen) && <UpdateReminder onAdd={onAdd} /> }
        {addPetModalOpen && <AddPet onAdd={onAdd} />}
      </Modal.Body>
    </Modal>
      );
    }
    
export default AddReminderModal;