import AddReminder from "./AddReminder";
import UpdateReminder from "./UpdateReminder";
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal';
import "./style.css";

const AddReminderModal = ({showReminder, updateModalOpen, setUpdateModalOpen, modalOpen, 
  setModalOpen, onAdd})=> {

  return (
    <Modal show={modalOpen || updateModalOpen}>
      <Modal.Header>
        <Modal.Title>
          {modalOpen && <h1>Add Reminder</h1>}
          {updateModalOpen && <h1>Update Reminder</h1>}
        </Modal.Title>
        <CloseButton
          onClick={() => {
            setUpdateModalOpen(false);
            setModalOpen(false);              
          }}>
        </CloseButton>
      </Modal.Header>
      <Modal.Body>
        {modalOpen && <AddReminder display="block" setModalOpen={setModalOpen}
        onAdd={onAdd} /> }
        {updateModalOpen && <UpdateReminder display="block" showReminderId={showReminder.id}
        showReminderTitle={showReminder.title} showReminderDate={showReminder.date}
        showReminderTime={showReminder.time} showReminderDescription={showReminder.description}
        setUpdateModalOpen={setUpdateModalOpen} onAdd={onAdd} /> }
      </Modal.Body>
      <Modal.Footer>
      <Button variant="danger"
                onClick={() => {
                  setUpdateModalOpen(false);
                  setModalOpen(false);                 
                }}>Cancel
              </Button>
      </Modal.Footer>
    </Modal>
      );
    }
    
export default AddReminderModal;