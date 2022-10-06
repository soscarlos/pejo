import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import TodoCard from '../../components/dashboard/TodoCard';
import LocationCard from '../../components/dashboard/LocationCard';
import DocumentCard from '../../components/dashboard/DocumentCard';
import TipsCard from '../../components/dashboard/TipsCard';
import ReminderCard from '../../components/dashboard/ReminderCard';
import './style.css';

const Home = () => {
    return (
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
    )
  };
  
  export default Home;
  