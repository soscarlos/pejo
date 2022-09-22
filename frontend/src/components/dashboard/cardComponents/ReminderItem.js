import React from 'react'
import Card from 'react-bootstrap/Card';

const ReminderItem = ({showReminder}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{showReminder.title}</Card.Title>
        <Card.Text>
        {showReminder.description}
        <p>{showReminder.date + " | " + showReminder.time}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ReminderItem