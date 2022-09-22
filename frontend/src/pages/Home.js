import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TodoCard from "../components/dashboard/TodoCard";
import LocationCard from "../components/dashboard/LocationCard";
import DocumentCard from '../components/dashboard/DocumentCard';
import TipsCard from '../components/dashboard/TipsCard';
import ReminderCard from '../components/dashboard/ReminderCard';

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
        </>    
    )
  };
  
  export default Home;
  