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
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-intro">
        {pets.map(pet =>
            <div key={pet.id}>
              {pet.name}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;