import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {

  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch('/pets')
      .then(response => response.json())
      .then(data => {
        setPets(data);
      })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <h1>PeJo</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-intro">
        <table cellspacing="15">
       <thead>
         <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Birthdate</td>
              <td>Type</td>
              <td>Gender</td>
              
         </tr>     
       </thead>
       <tbody>
        {pets.map(pet => (
        
        <tr key={pet.id}>
              <td>{pet.id}</td>
              <td>{pet.name}</td>
              <td>{pet.birthDate}</td>
              <td>{pet.petType}</td>
              <td>{pet.sexType}</td>
        </tr>
        
        ))}
        </tbody>
        
        </table>
        </div>
      </header>
    </div>
  );
}

export default App;