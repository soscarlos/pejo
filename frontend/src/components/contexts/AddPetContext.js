import { createContext, useState } from "react";
import useFetchToken from "../../hooks/useFetchToken";
import useAuthorization from "../../hooks/useAuthorization";




const AddPetContext = createContext({});

export const AddPetContextProvider = ({ children }) => {
    
    const [pets, setPets] = useState(null);

    return (
        <AddPetContext.Provider value={{ pets, setPets }}>
            {children}
        </AddPetContext.Provider>
    )
}

export default AddPetContext;