import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from '../../img/logo_orange.png';
import { useState } from 'react';
import usePostRegister from '../../hooks/usePostRegister';
import { Navigate } from 'react-router-dom';
import PasswordChecklist from "react-password-checklist"
import './style.css';


const Register = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [style, setStyle] = useState("hidePasswordChecklist");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        UseStoreUser({firstName, lastName, email, password});
        setIsSubmitted(true);
    }

    const UseStoreUser = async(user) => {
        await usePostRegister(user, 'http://localhost:8080/registration');
    }

    const showPasswordChecklist = () => {
        setStyle("showPasswordChecklist");
    }

    const registerForm = (
        <>
        <Container id='formContainer'>
            <img id='pejo-logo-register' src={logo} alt="pejo-logo" height={80} ></img>
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
                onChange={(e) => {setPassword(e.target.value) ; showPasswordChecklist() }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordControl">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control required type="password" placeholder="Retype your password" value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)} />
            </Form.Group>
            <Form.Group id={style}>
                <PasswordChecklist
                    rules={["minLength","specialChar","number","capital","match"]}
                    minLength={5}
                    value={password}
                    valueAgain={confirmedPassword}
                />
            </Form.Group>
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