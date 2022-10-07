import useFetch from '../../hooks/useFetch';
import './style.css';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';

const ShowPetProfile = () => {

    const [petData, setPetData] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    //let petData = useFetch('http://localhost:8080/pets/1').data;
    //setPetData(newData);
    //console.log(petData.id)
    const endpoint = 'http://localhost:8080/pets/1';

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(endpoint);
            let responseData = await response.json();
            console.log(responseData.id)
            setPetData(responseData);
        }
        getData();
    }, petData)
        //getData();
    //}, [endpoint])
    
    
  
    

    return (
        <Card id='documentCard' border="light">
        <Card.Body>
        <Card.Title id='documentTitle'><a href='/documents'> Documents </a></Card.Title>
        
        <Card.Text>
        {petData != null ?
          petData.id : "nix"}
        </Card.Text> 
        </Card.Body>
    </Card>  
    

    )

}

export default ShowPetProfile;