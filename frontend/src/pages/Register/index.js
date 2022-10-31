import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import dashboard_logo from '../../img/dashboard_logo.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import usePost from "../../hooks/usePost";
import { Navigate } from 'react-router-dom';
import PasswordChecklist from "react-password-checklist"
import './style.css';


const Register = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        UseStoreUser({firstName, lastName, email, password});
        setIsSubmitted(true);
    }

    const UseStoreUser = async(user) => {
        await usePost(user, 'http://localhost:8080/registration');
    }

    const registerForm = (
        <>
        <Navbar bg="light" variant="light">
            <Container fluid>
                <Navbar.Brand href="/"><img src={dashboard_logo} alt="PeJo" height={50}/></Navbar.Brand>
            </Container>
        </Navbar>
        <Container id='formContainer'>
        <Form id="loginForm" onSubmit={onSubmit}>
            <h1>Register</h1>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First name</Form.Label>
                <Form.Control required type="text" placeholder="Your first name" value={firstName}
                onChange={(e) => setFirstName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control required type="text" placeholder="Your last name" value={lastName}
                onChange={(e) => setLastName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" placeholder="Your email address" value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Your password" value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordControl">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control required type="password" placeholder="Retype your password" value={confirmedPassword}
                onChange={(e) => {setConfirmedPassword(e.target.value)}} />
            </Form.Group>
            <PasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={5}
				value={password}
                valueAgain={confirmedPassword}
			/>
            <Button type="submit" id="loginButton">Register</Button>
        </Form>
        </Container>
        </>
    )

    return (
        <>
        {isSubmitted ? <Navigate to="/login" /> : registerForm}
        </>
    )
};

export default Register;