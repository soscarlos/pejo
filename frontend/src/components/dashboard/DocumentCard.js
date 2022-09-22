import Card from 'react-bootstrap/Card';
import DocumentItem from './cardComponents/DocumentItem';

const DocumentCard = () => {
    return (
        <Card style={{backgroundColor: "#dcdcdc"}} border="light">
            <Card.Body>
            <Card.Title style={{color: "#0292ce"}}><a href='/documents'> Documents </a></Card.Title>
            <Card.Text>
                <DocumentItem />
            </Card.Text>
            </Card.Body>
        </Card>       
    )
  };
  
  export default DocumentCard;