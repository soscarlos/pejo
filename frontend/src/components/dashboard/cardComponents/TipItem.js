import React from 'react'
import Card from 'react-bootstrap/Card';

const TipItem = () => {
  return (
    <>
    <Card>
      <Card.Body>
        <Card.Title style={{color: "#fa9801"}}>Dog proof your home!</Card.Title>
        <Card.Text>Check whether your home is safe for your pet, ideally before you bring them home...</Card.Text>
      </Card.Body>
    </Card>
    <Card>
      <Card.Body>
        <Card.Title style={{color: "#fa9801"}}>Groom your cat regularly!</Card.Title>
        <Card.Text>Your cat will benefit greatly from regular brushing or combing...</Card.Text>
      </Card.Body>
    </Card>
    </>
  )
}

export default TipItem