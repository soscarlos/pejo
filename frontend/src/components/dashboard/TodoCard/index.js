import Card from 'react-bootstrap/Card';
import './style.css';

const TodoCard = () => {
    return (
        <Card id='todoCard' text="white" border="light">
            <Card.Body >
            <Card.Title id='todoTitle'><a href='/todos'> To-Dos </a></Card.Title>
            <Card.Text>
                <ul>
                    <li>Take Mogli to the vet</li>
                    <li>Take Pajti for a walk</li>
                    <li>Buy dog & cat food</li>
                </ul>
            </Card.Text>
            </Card.Body>
        </Card>    
    )
  };
  
  export default TodoCard;
  