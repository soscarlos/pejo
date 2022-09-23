import AddReminder from "./AddReminder";
import "./AddReminderModal.css";
import "../../App.css";
import React from 'react';
import { useEffect, useState, useRef } from 'react';

const AddReminderModal = ({setOpenModal, onAdd, openModal})=> {

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDiscription] = useState('');
  const addForm = document.getElementsByClassName('add-form')[0];
  

  return (
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="titleCloseBtn">
              <button
                onClick={() => {
                  setOpenModal(false);
                  addForm.setAttribute("style", "display: none");
                }}
              >
                X
              </button>
            </div>
            <div className="title">
              <h1>Add Reminder</h1>
            </div>
            <div className="body">
              <AddReminder onAdd={onAdd} display="block" openModal={openModal}/>

            </div>
            <div className="footer">
              <button
                onClick={() => {
                  setOpenModal(false);
                  addForm.setAttribute("style", "display: none");                 
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