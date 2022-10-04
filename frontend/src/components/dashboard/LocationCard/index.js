import Card from 'react-bootstrap/Card';
import './style.css';

const LocationCard = () => {
    return (
        <Card id='locationCard'>
            <Card.Body>
            <Card.Title><a href='/locations'> Locations </a></Card.Title>
            <Card.Text id='locationText'>
                <ul>
                    <li>Veterinarian</li>
                    <li>Shops</li>
                    <li>Dog zones</li>
                    <li>Pet saloons</li>
                </ul>
            </Card.Text>
            </Card.Body>
        </Card>      
    )
  };
  
  export default LocationCard;
