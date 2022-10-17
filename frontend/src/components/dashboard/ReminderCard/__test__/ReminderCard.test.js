import { render, screen } from '@testing-library/react';
import ReminderCard from '..';

test("load and display reminders", async () => {

    global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([ 
        {
            id: 1,
    title: "title",
    description: "description",
    date: "2022-10-10",
    time: "10:00:00" 
    }, {
        id: 2,
        title: "title2",
        description: "description2",
        date: "2022-10-11",
        time: "11:00:00" 
    }]),
  })
);


render( <ReminderCard /> )

})

test("load is loading", async () => {

    global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([ 
        {
            id: 1,
    title: "title",
    description: "description",
    date: "2022-10-10",
    time: "10:00:00" 
    }, {
        id: 2,
        title: "title2",
        description: "description2",
        date: "2022-10-11",
        time: "11:00:00" 
    }]),
  })
);

render( <ReminderCard /> )

}) 