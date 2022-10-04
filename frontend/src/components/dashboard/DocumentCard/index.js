import Card from 'react-bootstrap/Card';
import DocumentItem from './DocumentItem';
import './style.css';

const DocumentCard = () => {
    return (
        <Card id='documentCard' border="light">
            <Card.Body>
            <Card.Title id='documentTitle'><a href='/documents'> Documents </a></Card.Title>
            <Card.Text>
                <DocumentItem />
            </Card.Text>
            </Card.Body>
        </Card>       
    )
  };
  
  export default DocumentCard;