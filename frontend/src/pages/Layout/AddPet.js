import { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./style.css";
import { AddPetModalContext } from '../PetProfiles/petContext';
import AddPetContext from '../../components/contexts/AddPetContext';


const AddPet = ({ onAdd }) => {

    const addPetModal = useContext(AddPetModalContext);
    const setPets = useContext(AddPetContext).setPets;

    const token = localStorage.getItem('token');

    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [petType, setPetType] = useState('DOG');
    const [sexType, setSexType] = useState('FEMALE');

    const onSubmit = async (e) => {
        e.preventDefault();      
        addPetModal.toggleAddPetModalOpen(false);
        const newPet = await onAdd({name, birthDate, petType, sexType}, 'http://localhost:8080/pets', token);
        const id = newPet.id;
        setPets(arr => [...arr, {id, name, birthDate, petType, sexType}]);


    }

    return (
        <container>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Add name' value={name}
              onChange={(e) => setName(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Birthdate</Form.Label>
            <Form.Control type="date" placeholder='Add birthdate' value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pet type</Form.Label>
          <select class="form-control" onChange={(e) => setPetType(e.target.value)}>
             <option>DOG</option>
             <option>CAT</option>
          </select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Sex type</Form.Label>
            <select class="form-control" onChange={(e) => setSexType(e.target.value)}>
             <option>FEMALE</option>
             <option>MALE</option>
            </select>  
          </Form.Group>
          <Button id='addPetSubmitButton' type="submit">
            Submit
          </Button>
        </Form>
        </container>  
      ) 

}

export default AddPet;