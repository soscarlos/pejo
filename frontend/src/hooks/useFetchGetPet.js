import useFetch from './useFetch';

const useFetchGetPet = ()  => {
    //const response = await fetch('http://localhost:8080/pets/1');
    //let petData = await response.json();
    let petData = useFetch('http://localhost:8080/pets/1').data;
    //setPetId(petData.id);
    console.log(petData.id)
    return petData.id;
    }

    export default useFetchGetPet;