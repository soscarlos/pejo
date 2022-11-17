import { useContext, useEffect } from "react";
import { Outlet, Routes, Route } from "react-router-dom"
import AddPetContext from "../../components/contexts/AddPetContext";
import useAuthorization from "../../hooks/useAuthorization";
import useFetchToken from "../../hooks/useFetchToken";
import PetProfile from "../PetProfiles"

const Pets = () => {
  const { authorization } = useAuthorization();
  const storedToken = localStorage.getItem('token');

  const pets = useContext(AddPetContext).pets;
  const setPets = useContext(AddPetContext).setPets;
  const initialPets = useFetchToken('http://localhost:8080/pets', storedToken? storedToken : authorization.accessToken).data;
  
  useEffect(() => {
    if (pets === null) {
    setPets(initialPets);
    }
  },pets)

  return (
    <>
        <Routes>
          {pets && pets.map(pet => <Route path={`${pet.id}`} element={<PetProfile petId={pet.id}/>} />)}   
        </Routes>
        
        <Outlet />
    </>
  )
}

export default Pets