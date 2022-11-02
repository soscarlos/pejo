import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import ToDos from './pages/ToDos';
import Locations from './pages/Locations';
import Documents from './pages/Documents';
import Tips from './pages/Tips';
import PageNotFound from './pages/PageNotFound';
import Reminder from './pages/Reminders';
import PetProfile from './pages/PetProfiles';
<<<<<<< HEAD
import { useContext, useState } from "react";
=======
import Login from "./pages/Login";
import Register from "./pages/Register";
>>>>>>> 0cfceb9bfd890b165730385a42878c9a6ee63635
import './App.css';
import { PetIdContext } from "./pages/PetProfiles/petContext";
import useFetch from "./hooks/useFetch";

const App = () => {

  //const [petId, setPetId] = useState(2);
  const pets = useFetch('http://localhost:8080/pets').data;

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout pets={pets} />}>
          <Route index element={<Home />} />
          <Route path="todos" element={<ToDos />} />
          <Route path="locations" element={<Locations />} />
          <Route path="documents" element={<Documents />} />
          <Route path="tips" element={<Tips />} />
          <Route path="reminders" element={<Reminder />} />
          {pets != null ? pets.map(pet =>          
          <Route path={"pets/" + pet.id} element={<PetProfile petId={pet.id}/>} />         
          )
           : "No Pets"}        
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;