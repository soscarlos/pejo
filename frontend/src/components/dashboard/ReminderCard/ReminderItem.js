import React from 'react'
import Card from 'react-bootstrap/Card';

const ReminderItem = ({showReminder}) => {
  return (
    <Card id='reminderItem'>
      <Card.Body>
        <Card.Title id='reminderItemTitle'>{showReminder.title}</Card.Title>
        <Card.Text id='reminderItemText'>
        {showReminder.description}
        <p>{showReminder.date + " | " + showReminder.time}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ReminderItem