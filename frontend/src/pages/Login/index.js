import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import dashboard_logo from '../../img/dashboard_logo.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style.css';

const Login = () => {
    return (
        <>
        <Navbar bg="light" variant="light">
            <Container fluid>
                <Navbar.Brand href="/"><img src={dashboard_logo} alt="PeJo" height={50}/></Navbar.Brand>
            </Container>
        </Navbar>
        <Container id='formContainer'>
        <Form id="loginForm">
            <h1>Login</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button type="submit" id="loginButton">Login</Button>
            <a href='/register' className='btn'>No account yet? Register</a>
        </Form>
        </Container>
        </>
    )
};

export default Login;