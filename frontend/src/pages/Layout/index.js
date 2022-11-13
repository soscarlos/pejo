import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import dashboard_logo from '../../img/dashboard_logo.png';
import profile from '../../img/profile.png';
import dog from '../../img/dog.jpg'
import cat from '../../img/cat.jpg'
import { Outlet } from "react-router-dom";
import './style.css';
import useAuthorization from '../../hooks/useAuthorization';
import useFetchToken from '../../hooks/useFetchToken';

const Layout = () => {  
  const { authorization, setAuthorization } = useAuthorization();
  const storedToken = localStorage.getItem('token');
  const isLoggedIn = authorization != null || storedToken != null;

  const pets = useFetchToken('http://localhost:8080/pets', isLoggedIn ? storedToken? storedToken : authorization.accessToken : '').data;

  const logOut = () => {
    localStorage.clear();
    setAuthorization(null);
  }

  return (
    <>
      <Navbar bg="light" variant="light" id='navbar'>
        <Container fluid>
          <Navbar.Brand href={pets ? "/": "/login"}>
            <img src={dashboard_logo} alt="PeJo" height={50}/>
          </Navbar.Brand>
          <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end" id='icons'>
          {pets != null ? pets.map(pet => <Nav.Link        
          href={"http://localhost:3000/pets/" + pet.id} className='petIcon'><img src={pet.petType==="DOG"? dog : cat}
           alt={"pet" + pet.id}/></Nav.Link>)
           : ""}
          {pets && <Nav.Link href="/login" onClick={logOut} ><img src={profile} alt="User"/></Nav.Link>}
        </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar bg="light" variant="light" className="fixed-bottom" id='footer'>
        <Container className="justify-content-center">
            <Navbar.Text>© 2022 Copyright: PeJo</Navbar.Text>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
};

export default Layout;
