import React from 'react'
import Card from 'react-bootstrap/Card';

const DocumentItem = () => {
  return (
    <>
    <Card id='documentItem'>
        <Card.Body>
            <Card.Text id='documentItemText'>Bob blood test - 08/08/2015</Card.Text>
        </Card.Body>
    </Card>
    <Card id='documentItem'>
        <Card.Body>
            <Card.Text id='documentItemText'>Mogli vaccination - 05/03/2021</Card.Text>
        </Card.Body>
    </Card>
    </>
  )
}

export default DocumentItem