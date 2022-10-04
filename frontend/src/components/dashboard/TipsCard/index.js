import Card from 'react-bootstrap/Card';
import TipItem from './TipItem';
import './style.css';

const TipsCard = () => {
    return (
        <Card id='tipsCard' border="light">
            <Card.Body>
            <Card.Title id='tipsTitle'><a href='/tips'>Tips</a></Card.Title>
            <Card.Text>
                <TipItem/>
            </Card.Text>
            </Card.Body>
        </Card>    
    )
  };
  
  export default TipsCard;
  