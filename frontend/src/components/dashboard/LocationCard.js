import Card from 'react-bootstrap/Card';

const LocationCard = () => {
    return (
        <Card id='locationCard'>
            <Card.Body>
            <Card.Title style={{color: "#fa9801"}}><a href='/locations'> Locations </a></Card.Title>
            <Card.Text style={{color: "#0292ce"}}>
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
  