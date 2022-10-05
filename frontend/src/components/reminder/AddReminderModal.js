import AddReminder from "./AddReminder";
import UpdateReminder from "./UpdateReminder";
import "./AddReminderModal.css";
import "../../App.css";
import React from 'react';

const AddReminderModal = ({showReminder, updateModalOpen, setUpdateModalOpen, modalOpen, 
  setModalOpen, onAdd})=> {

  //const addForm = document.getElementsByClassName('add-form')[0];
  

  return (
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="titleCloseBtn">
              <button
                onClick={() => {
                  setUpdateModalOpen(false);
                  setModalOpen(false);              
                  //addForm.setAttribute("style", "display: none");
                }}
              >
                X
              </button>
            </div>
            <div className="title">
              {modalOpen && <h1>Add Reminder</h1>}
              {updateModalOpen && <h1>Update Reminder</h1>}
            </div>
            <div className="body">
             {modalOpen && <AddReminder display="block" modalOpen={modalOpen}
              onAdd={onAdd} /> }

             {updateModalOpen && <UpdateReminder display="block" showReminderId={showReminder.id}
             showReminderTitle={showReminder.title} showReminderDate={showReminder.date}
             showReminderTime={showReminder.time} showReminderDescription={showReminder.description}
             updateModalOpen={updateModalOpen} onAdd={onAdd} /> }
            </div>
            <div className="footer">
              <button
                onClick={() => {
                  setUpdateModalOpen(false);
                  setModalOpen(false);
                  //addForm.setAttribute("style", "display: none");                 
                }}
                id="cancelBtn"
              >
                Cancel
              </button>
              <button>Continue</button>
              </div>
          </div>
        </div>
      );
    }
    


export default AddReminderModal;