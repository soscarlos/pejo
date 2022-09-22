import Card from 'react-bootstrap/Card';

const DocumentCard = () => {
    return (
        <Card>
            <Card.Body>
            <Card.Title><a href='/documents'> Documents </a></Card.Title>
            <Card.Text>
                <ul>
                    <li>Pajti blood test 08/08/2015</li>
                    <li>Mogli vaccination 05/06/2020</li>
                </ul>
            </Card.Text>
            </Card.Body>
        </Card>       
    )
  };
  
  export default DocumentCard;