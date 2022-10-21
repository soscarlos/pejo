import useFetch from '../../hooks/useFetch';

export const ShowPetProfiles = () => {
    let petData = useFetch('http://localhost:8080/pets').data;
}