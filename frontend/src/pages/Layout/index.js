import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import dashboard_logo from '../../img/dashboard_logo.png';
import profile from '../../img/profile.png';
import dog from '../../img/dog.jpg'
import cat from '../../img/cat.jpg'
import { Outlet } from "react-router-dom";
import './style.css';

const Layout = () => {
  return (
    <>
      <Navbar bg="light" variant="light" id='navbar'>
        <Container fluid>
          <Navbar.Brand href="/">
            <img src={dashboard_logo} alt="PeJo" height={50}/>
          </Navbar.Brand>
          <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end" id='icons'>
          <Nav.Link href="#pet1" className='petIcon'><img src={dog} alt="Pet1"/></Nav.Link>
          <Nav.Link href="#pet2" className='petIcon'><img src={cat} alt="Pet2"/></Nav.Link>
          <Nav.Link href="#user"><img src={profile} alt="User"/></Nav.Link>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar bg="light" variant="light" className="fixed-bottom">
        <Container className="justify-content-center">
            <Navbar.Text>© 2022 Copyright: PeJo</Navbar.Text>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
};

export default Layout;
