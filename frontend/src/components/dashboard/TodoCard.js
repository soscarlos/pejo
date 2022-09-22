import Card from 'react-bootstrap/Card';

const TodoCard = () => {
    return (
        <Card text="white" style={{backgroundColor: "#0292ce"}} border="light">
            <Card.Body >
            <Card.Title><a href='/todos'> To-Dos </a></Card.Title>
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
  