import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TodoCard from "../components/dashboard/TodoCard";
import LocationCard from "../components/dashboard/LocationCard";
import DocumentCard from '../components/dashboard/DocumentCard';
import TipsCard from '../components/dashboard/TipsCard';
import ReminderCard from '../components/dashboard/ReminderCard';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Home = () => {
    return (
        <>
        <h1 className='text-center'>Dashboard</h1>
        <Row style={{marginBottom: "2%"}}>
            <Col>
                <TodoCard />
            </Col>
            <Col>
                <LocationCard />
            </Col>
            <Col>
                <DocumentCard/>
                </Col>
        </Row>
        <Row>
            <Col>
                <TipsCard />
            </Col>
            <Col>
            <ReminderCard />
            </Col>
        </Row>
        <Navbar bg="light" variant="light" className="fixed-bottom">
            <Container className="justify-content-center">
                <Navbar.Text>© 2022 Copyright: PeJo</Navbar.Text>
            </Container>
      </Navbar>
        </>    
    )
  };
  
  export default Home;
  