import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import logo from '../../img/logo_orange.png';
import './style.css';
import usePostUser from '../../hooks/usePostUser';
import useAuthorization from '../../hooks/useAuthorization';

const Login = () => {
    const { setAuthorization } = useAuthorization();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        UseLoginUser({email, password});
    }

    const UseLoginUser = async(user) => {
        let accessToken = await usePostUser(user, 'http://localhost:8080/login');
        let tokenIsPresent = accessToken.length !== 0;
        setAuthorization({accessToken});
        localStorage.setItem('token', accessToken);
        setIsSubmitted(tokenIsPresent);
    }

    const loginForm = (
        <>
        <Container id='formContainer'>
            <img id='pejo-logo-login' src={logo} alt="pejo-logo" height={80} ></img>
        <Form id="loginForm" onSubmit={onSubmit}>
            <h1>Login</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button type="submit" id="loginButton">Login</Button>
            <a href='/register' className='btn'>No account yet? Register</a>
        </Form>
        </Container>
        </>
    )

    return (
        <>
        {isSubmitted ? <Navigate to="/" /> : loginForm}
        </>
    )
};

export default Login;