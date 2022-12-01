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
import React, { useState } from 'react';
import './style.css';

const Home = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

        <Button variant="primary" onClick={handleShow}>
        Launch demo modal
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Notifications</Modal.Title>
            </Modal.Header>
            <Modal.Body>Notification</Modal.Body>
            <Modal.Footer>
                <Button id='reminderCloseButton' onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
        </>

        // setTimeOut > date - current date
    )
  };
  
  export default Home;