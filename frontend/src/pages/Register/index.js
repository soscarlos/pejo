import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import dashboard_logo from '../../img/dashboard_logo.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style.css';

const Register = () => {
    return (
        <>
        <Navbar bg="light" variant="light">
            <Container fluid>
                <Navbar.Brand href="/"><img src={dashboard_logo} alt="PeJo" height={50}/></Navbar.Brand>
            </Container>
        </Navbar>
        <Container id='formContainer'>
        <Form id="loginForm">
            <h1>Register</h1>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" placeholder="Your first name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" placeholder="Your last name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Your email address" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Your password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordControl">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" placeholder="Retype your password" />
            </Form.Group>
            <Button type="submit" id="loginButton">Register</Button>
        </Form>
        </Container>
        </>
    )
};

export default Register;