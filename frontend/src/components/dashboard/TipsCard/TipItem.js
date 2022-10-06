import React from 'react'
import Card from 'react-bootstrap/Card';
import './style.css';

const TipItem = () => {
  return (
    <>
    <Card id='tipItem'>
      <Card.Body>
        <Card.Title id='tipItemTitle'>Dog proof your home!</Card.Title>
        <Card.Text id='tipItemText'>Check whether your home is safe for your dog, ideally before you bring them home...</Card.Text>
      </Card.Body>
    </Card>
    <Card id='tipItem'>
      <Card.Body>
        <Card.Title id='tipItemTitle'>Groom your cat regularly!</Card.Title>
        <Card.Text id='tipItemText'>Your cat will benefit greatly from regular brushing or combing...</Card.Text>
      </Card.Body>
    </Card>
    <Card id='tipItem'>
      <Card.Body>
        <Card.Title id='tipItemTitle'>Microchip your pet</Card.Title>
        <Card.Text id='tipItemText'>Identification helps your pets find their way home after getting lost...</Card.Text>
      </Card.Body>
    </Card>
    <Card id='tipItem'>
      <Card.Body>
        <Card.Title id='tipItemTitle'>Maintain a healthy weight</Card.Title>
        <Card.Text id='tipItemText'>Many dogs and cats are overweight or obese which comes with health risks...</Card.Text>
      </Card.Body>
    </Card>
    </>
  )
}

export default TipItem