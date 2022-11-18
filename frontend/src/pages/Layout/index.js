import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import dashboard_logo from '../../img/dashboard_logo.png';
import add_pet from '../../img/add_pet_button.png';
import exit from '../../img/log-out.png';
import dog from '../../img/dog.jpg'
import cat from '../../img/cat.jpg'
import { Outlet, useNavigate } from "react-router-dom";
import './style.css';
import useAuthorization from '../../hooks/useAuthorization';
import useFetchToken from '../../hooks/useFetchToken';
import { useContext, useEffect, useState } from 'react';
import AddReminderModal from '../Reminders/AddReminderModal';
import { AddPetModalContext } from '../PetProfiles/petContext';
import usePost from '../../hooks/usePost';
import AddPetContext from '../../components/contexts/AddPetContext';

const Layout = () => {  
  const { authorization, setAuthorization } = useAuthorization();
  const storedToken = localStorage.getItem('token');
  const isLoggedIn = authorization !== null || storedToken !== null;
  const [addPetModalOpen, setAddPetModalOpen] = useState(false);

  const pets = useContext(AddPetContext).pets;
  const setPets = useContext(AddPetContext).setPets;
  const initialPets = useFetchToken('http://localhost:8080/pets', storedToken? storedToken : authorization.accessToken).data;


  useEffect(() => {
    if (pets === null) {
      setPets(initialPets);
      }
    }, pets)
  
  const navigate = useNavigate();

  const redirect = () => {
    console.log(authorization);
    console.log(storedToken);
    console.log(isLoggedIn);
    pets ? navigate("/") : navigate("/login")
  }

  const logOut = () => {
    localStorage.clear();
    setAuthorization(null);
    navigate("/login");
  }

  const addPet = () => {
    setAddPetModalOpen(true);
  }

  return (
    <>
      <Navbar bg="light" variant="light" id='navbar'>
        <Container fluid>
          <Navbar.Brand>
            <img src={dashboard_logo} alt="PeJo" height={50} onClick={redirect}/>
          </Navbar.Brand>
          <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end" id='icons'>
          {pets != null ? pets.map(pet => <img src={pet.petType==="DOG"? dog : cat}
           alt={"pet" + pet.id} onClick={() => navigate(`/pets/${pet.id}`)}/>)
           : ""}
           <img src={add_pet} onClick={addPet} />
          {pets && <img src={exit}  onClick={logOut} alt="User"/>}
        </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar bg="light" variant="light" className="fixed-bottom" id='footer'>
        <Container className="justify-content-center">
            <Navbar.Text>© 2022 Copyright: PeJo</Navbar.Text>
        </Container>
      </Navbar>
      <Outlet />
      {addPetModalOpen && 
      <AddPetModalContext.Provider value={{addPetModalOpen: addPetModalOpen,
      toggleAddPetModalOpen: setAddPetModalOpen}} >
      <AddReminderModal onAdd={usePost} />
      </AddPetModalContext.Provider>}
    </>
  )
};

export default Layout;