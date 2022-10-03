import React from 'react'
import Card from 'react-bootstrap/Card';
import './style.css';

const TipItem = () => {
  return (
    <>
    <Card>
      <Card.Body>
        <Card.Title id='tipItemTitle'>Dog proof your home!</Card.Title>
        <Card.Text>Check whether your home is safe for your pet, ideally before you bring them home...</Card.Text>
      </Card.Body>
    </Card>
    <Card>
      <Card.Body>
        <Card.Title id='tipItemTitle'>Groom your cat regularly!</Card.Title>
        <Card.Text>Your cat will benefit greatly from regular brushing or combing...</Card.Text>
      </Card.Body>
    </Card>
    </>
  )
}

export default TipItem