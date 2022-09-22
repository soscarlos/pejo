import Card from 'react-bootstrap/Card';

const TipsCard = () => {
    return (
        <Card>
            <Card.Body>
            <Card.Title><a href='/tips'> Tips </a></Card.Title>
            <Card.Text>
                <h6>Dog proof your home!</h6>
                <p>Check whether your home is safe for your pet, ideally before you bring them home...</p>
                <h6>Groom your cat regularly!</h6>
                <p>Your cat will benefit greatly from regular brushing or combing...</p>
            </Card.Text>
            </Card.Body>
        </Card>    
    )
  };
  
  export default TipsCard;
  