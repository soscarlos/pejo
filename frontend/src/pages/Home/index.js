import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import TodoCard from '../../components/dashboard/TodoCard';
import LocationCard from '../../components/dashboard/LocationCard';
import DocumentCard from '../../components/dashboard/DocumentCard';
import TipsCard from '../../components/dashboard/TipsCard';
import ReminderCard from '../../components/dashboard/ReminderCard';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import useFetchToken from '../../hooks/useFetchToken';
import './style.css';


const Home = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const token = localStorage.getItem('token');
    const reminders = useFetchToken('http://localhost:8080/reminders', token).data;
    const today = new Date();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    useEffect(() => {
        setTimeout(() => {
            reminders.map(reminder => {
                reminder.active ? setShow(true) : setShow(false);
            })
        }, 1000)
    })


    return (
        <>
        <Container fluid>
            <Row id='firstRow'>
                <Col className='container'>
                    <TodoCard />
                </Col>
                <Col className='container'>
                    <LocationCard />
                </Col>
                <Col className='container'>
                    <DocumentCard />
                </Col>
            </Row>
            <Row id='secondRow'>
                <Col className='container'>
                    <TipsCard />
                </Col>
                <Col className='container'>
                    <ReminderCard />
                </Col>
            </Row>
        </Container>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Notifications</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {reminders != null ? reminders.map(reminder =>
                <div key={reminder.id}>
                <h5>{reminder.active ? reminder.title : ""}</h5>
                {reminder.active ? reminder.reminderDate + " " + reminder.reminderTime : ""}
                </div>) : ""}
            </Modal.Body>
            <Modal.Footer>
                <Button id='reminderCloseButton' onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
  };
  
  export default Home;