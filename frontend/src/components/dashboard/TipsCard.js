import Card from 'react-bootstrap/Card';
import TipItem from './cardComponents/TipItem';

const TipsCard = () => {
    return (
        <Card style={{backgroundColor: "#dcdcdc"}} border="light">
            <Card.Body>
            <Card.Title style={{color: "#0292ce"}}><a href='/tips'>Tips</a></Card.Title>
            <Card.Text>
                <TipItem/>
            </Card.Text>
            </Card.Body>
        </Card>    
    )
  };
  
  export default TipsCard;
  