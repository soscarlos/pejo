import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import dashboard_logo from '../img/dashboard_logo.png';

const Layout = () => {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <img src={dashboard_logo} alt="PeJo" height={50}/>
          </Navbar.Brand>
          <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link href="#user"><img alt="User"/></Nav.Link>
          <Nav.Link href="#pet1"><img alt="Pet1"/></Nav.Link>
          <Nav.Link href="#pet2"><img alt="Pet2"/></Nav.Link>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
};

export default Layout;
